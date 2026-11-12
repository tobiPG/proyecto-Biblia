process.env.DB_PATH = ":memory:";
process.env.WEB_DIST = "/nonexistent";

import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { after, before, describe, it } from "node:test";
import { createApp } from "../app";
import { db } from "../db";
import { getQuestion } from "../services/questionBank";

let base = "";
let close: () => void;

before(async () => {
  const server = createApp().listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;
  close = () => server.close();
});
after(() => close());

/** Cliente mínimo con cookie de sesión. */
class Client {
  cookie = "";
  async call(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
    const res = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json", ...(this.cookie ? { Cookie: this.cookie } : {}), ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) this.cookie = setCookie.split(";")[0];
    const text = await res.text();
    return { status: res.status, body: text ? JSON.parse(text) : null, setCookie };
  }
}

async function registered(name: string) {
  const c = new Client();
  const r = await c.call("POST", "/auth/register", {
    email: `${name}@example.com`,
    password: "contraseña-segura",
    displayName: name,
  });
  assert.equal(r.status, 201, JSON.stringify(r.body));
  return { client: c, user: r.body.user };
}

/** Responde una partida completa usando el servidor (acierta las preguntas pares). */
async function playThrough(c: Client, game: { id: string; total: number; questions: { id: number; options: string[] }[] }) {
  let last;
  for (let i = 0; i < game.total; i++) {
    const q = getQuestion(game.questions[i].id)!;
    const correctText = q.options[q.correct];
    const right = game.questions[i].options.indexOf(correctText);
    const chosen = i % 2 === 0 ? right : (right + 1) % game.questions[i].options.length;
    last = await c.call("POST", `/games/${game.id}/answers`, { questionIndex: i, chosen });
    assert.equal(last.status, 200, JSON.stringify(last.body));
    assert.equal(last.body.correct, i % 2 === 0);
  }
  return last!.body;
}

describe("auth", () => {
  it("registra con cookie httpOnly y no expone el hash", async () => {
    const c = new Client();
    const r = await c.call("POST", "/auth/register", {
      email: "Ana@Example.com",
      password: "12345678",
      displayName: "Ana",
    });
    assert.equal(r.status, 201);
    assert.match(r.setCookie!, /HttpOnly/i);
    assert.equal(r.body.user.email, "ana@example.com");
    assert.equal(JSON.stringify(r.body).includes("password"), false);
    const me = await c.call("GET", "/me");
    assert.equal(me.status, 200);
    assert.equal(me.body.user.displayName, "Ana");
  });

  it("rechaza contraseñas cortas, emails repetidos y login incorrecto", async () => {
    const c = new Client();
    assert.equal((await c.call("POST", "/auth/register", { email: "b@x.com", password: "123", displayName: "Bo" })).status, 400);
    assert.equal(
      (await c.call("POST", "/auth/register", { email: "ana@example.com", password: "12345678", displayName: "Otra" }))
        .status,
      409
    );
    assert.equal((await c.call("POST", "/auth/login", { email: "ana@example.com", password: "malmalmal" })).status, 401);
    assert.equal((await c.call("POST", "/auth/login", { email: "ana@example.com", password: "12345678" })).status, 200);
  });

  it("exige sesión y rechaza POST de otros orígenes", async () => {
    const anon = new Client();
    assert.equal((await anon.call("GET", "/me")).status, 401);
    const { client } = await registered("origen");
    const r = await client.call("POST", "/games", { mode: "daily" }, { Origin: "https://evil.example" });
    assert.equal(r.status, 403);
  });

  it("no acepta HTML en el nombre", async () => {
    const c = new Client();
    const r = await c.call("POST", "/auth/register", {
      email: "xss@x.com",
      password: "12345678",
      displayName: "<img src=x onerror=alert(1)>",
    });
    assert.equal(r.status, 400);
  });
});

describe("partidas", () => {
  it("el servidor corrige, puntúa y actualiza estadísticas", async () => {
    const { client } = await registered("jugador");
    const start = await client.call("POST", "/games", { mode: "solo", category: "personajes", difficulty: "facil" });
    assert.equal(start.status, 201);
    const game = start.body.game;
    assert.equal(game.total, 10);
    assert.equal("correct" in game.questions[0], false, "no debe enviar la respuesta correcta");

    // No se puede saltar preguntas
    assert.equal((await client.call("POST", `/games/${game.id}/answers`, { questionIndex: 3, chosen: 0 })).status, 409);

    const last = await playThrough(client, game);
    assert.equal(last.finished, true);
    assert.equal(last.summary.correct, 5);
    assert.ok(last.summary.score >= 50);
    assert.ok(last.summary.newBadges.some((b: { id: string }) => b.id === "first_win"));

    // Reenviar una respuesta es idempotente; la partida ya no admite más
    const again = await client.call("POST", `/games/${game.id}/answers`, { questionIndex: 9, chosen: 0 });
    assert.equal(again.status, 200);
    assert.equal(again.body.score, last.score);

    const stats = await client.call("GET", "/me/stats");
    assert.equal(stats.body.stats.totalGames, 1);
    assert.equal(stats.body.stats.totalCorrect, 5);
    assert.equal(stats.body.stats.totalPoints, last.summary.score);
  });

  it("no deja responder la partida de otro usuario", async () => {
    const a = await registered("dueno");
    const b = await registered("intruso");
    const g = (await a.client.call("POST", "/games", { mode: "solo", category: "reyes", difficulty: "facil" })).body.game;
    assert.equal((await b.client.call("POST", `/games/${g.id}/answers`, { questionIndex: 0, chosen: 0 })).status, 404);
  });

  it("cuenta como fallo una respuesta fuera de tiempo", async () => {
    const { client } = await registered("lento");
    const g = (await client.call("POST", "/games", { mode: "solo", category: "libros", difficulty: "facil" })).body.game;
    db.prepare("UPDATE games SET question_started_at = ? WHERE id = ?").run(Date.now() - 60_000, g.id);
    const q = getQuestion(g.questions[0].id)!;
    const right = g.questions[0].options.indexOf(q.options[q.correct]);
    const r = await client.call("POST", `/games/${g.id}/answers`, { questionIndex: 0, chosen: right });
    assert.equal(r.body.correct, false);
    assert.equal(r.body.timedOut, true);
  });

  it("el desafío diario es igual para todos y solo se juega una vez", async () => {
    const a = await registered("diario1");
    const b = await registered("diario2");
    const ga = (await a.client.call("POST", "/games", { mode: "daily" })).body.game;
    const gb = (await b.client.call("POST", "/games", { mode: "daily" })).body.game;
    assert.deepEqual(
      ga.questions.map((q: { id: number }) => q.id),
      gb.questions.map((q: { id: number }) => q.id)
    );
    await playThrough(a.client, ga);
    assert.equal((await a.client.call("POST", "/games", { mode: "daily" })).status, 409);
    const me = await a.client.call("GET", "/me");
    assert.equal(me.body.dailyStreak, 1);
    assert.equal(me.body.dailyDoneToday, true);
  });
});

describe("amigos y retos 1 vs 1", () => {
  it("flujo completo: solicitud, reto, ambos juegan, gana el de más puntos", async () => {
    const a = await registered("retador");
    const b = await registered("rival");
    const c = await registered("ajeno");

    // Sin amistad no se puede retar
    const noFriend = await a.client.call("POST", "/challenges", { friendId: b.user.id, category: "aleatorio", difficulty: "facil" });
    assert.equal(noFriend.status, 403);

    assert.equal((await a.client.call("POST", "/friends/requests", { code: b.user.friendCode })).status, 201);
    const reqs = await b.client.call("GET", "/friends");
    assert.equal(reqs.body.incoming[0].id, a.user.id);
    assert.equal((await b.client.call("POST", `/friends/requests/${a.user.id}/accept`)).status, 204);

    const created = await a.client.call("POST", "/challenges", {
      friendId: b.user.id,
      category: "aleatorio",
      difficulty: "facil",
    });
    assert.equal(created.status, 201);
    const id = created.body.challenge.id;

    // El rival debe aceptar antes de jugar; un tercero no puede jugar
    assert.equal((await b.client.call("POST", `/challenges/${id}/play`)).status, 409);
    assert.equal((await c.client.call("POST", `/challenges/${id}/play`)).status, 403);

    const ga = (await a.client.call("POST", `/challenges/${id}/play`)).body.game;
    await playThrough(a.client, ga); // 5 aciertos

    assert.equal((await b.client.call("POST", `/challenges/${id}/accept`)).status, 200);
    const gb = (await b.client.call("POST", `/challenges/${id}/play`)).body.game;
    assert.deepEqual(
      ga.questions.map((q: { id: number }) => q.id),
      gb.questions.map((q: { id: number }) => q.id),
      "ambos juegan las mismas preguntas"
    );
    // B falla todas
    for (let i = 0; i < gb.total; i++) {
      const q = getQuestion(gb.questions[i].id)!;
      const right = gb.questions[i].options.indexOf(q.options[q.correct]);
      await b.client.call("POST", `/games/${gb.id}/answers`, { questionIndex: i, chosen: (right + 1) % gb.questions[i].options.length });
    }

    const list = await a.client.call("GET", "/challenges");
    const ch = list.body.challenges.find((x: { id: number }) => x.id === id);
    assert.equal(ch.status, "completed");
    assert.equal(ch.outcome, "me");
    const stats = await a.client.call("GET", "/me/stats");
    assert.equal(stats.body.stats.challengesWon, 1);
  });
});

describe("clanes", () => {
  it("crear, unirse y salir", async () => {
    const a = await registered("lider");
    const b = await registered("miembro");
    const created = await a.client.call("POST", "/clans", { name: "Los Fieles", description: "Hola" });
    assert.equal(created.status, 201);
    const tag = created.body.clan.tag;
    assert.equal((await b.client.call("POST", "/clans/join", { tag })).status, 200);
    assert.equal((await b.client.call("POST", "/clans/join", { tag })).status, 409);
    const mine = await b.client.call("GET", "/clans/mine");
    assert.equal(mine.body.clan.memberCount, 2);
    assert.equal((await a.client.call("POST", "/clans/leave")).status, 204);
    const after = await b.client.call("GET", "/clans/mine");
    assert.equal(after.body.clan.leaderId, b.user.id);
    assert.equal(
      (await a.client.call("POST", "/clans", { name: "<script>", description: "" })).status,
      400
    );
  });
});
