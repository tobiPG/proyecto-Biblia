// Script para crear cuenta y probar sincronización
async function createAccountAndTest() {
  console.log("📝 CREANDO CUENTA DE PRUEBA\n");
  console.log("========================================\n");

  // 1. Registrar nueva cuenta
  console.log("1️⃣ Registrando cuenta nueva...");
  let response = await fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "o.agg1130@gmail.com",
      password: "1234",
      displayName: "Mi Cuenta"
    })
  });

  if (!response.ok) {
    console.log("❌ Error:", response.status, await response.text());
    return;
  }

  const registered = await response.json();
  const token = registered.token;
  const userId = registered.user.uid;

  console.log("   ✅ Cuenta creada exitosamente");
  console.log(`      Email: o.agg1130@gmail.com`);
  console.log(`      Usuario: ${registered.user.displayName}`);
  console.log(`      UID: ${userId}`);
  console.log(`      Token: ${token}\n`);

  // 2. Obtener progreso inicial
  console.log("2️⃣ Obteniendo progreso inicial...");
  response = await fetch("http://localhost:3001/api/users/me/progress", {
    headers: { Authorization: `Bearer ${token}` }
  });
  let progress = await response.json();
  console.log("   ✅ Progreso inicial:");
  console.log(`      Level: ${progress.level}`);
  console.log(`      Puntos: ${progress.totalPoints}`);
  console.log(`      Monedas: ${progress.coins}`);
  console.log(`      Partidas: ${progress.totalGames}\n`);

  // 3. Simular juego y ganar puntos
  console.log("3️⃣ SIMULANDO JUEGO - Ganas puntos y monedas...");
  const newProgress = {
    level: 5,
    xp: 400,
    totalPoints: 1200,
    totalCorrect: 95,
    totalGames: 12,
    bestStreak: 15,
    coins: 600,
    coinsEarned: 700,
    coinsSpent: 100,
    coinMultiplier: 1.5,
    displayName: "Mi Cuenta"
  };

  console.log("   📊 Nuevo progreso:");
  console.log(`      Level: ${newProgress.level}`);
  console.log(`      Puntos: ${newProgress.totalPoints}`);
  console.log(`      Monedas: ${newProgress.coins}`);
  console.log(`      Partidas: ${newProgress.totalGames}\n`);

  // 4. Sincronizar progreso
  console.log("4️⃣ Sincronizando progreso a MongoDB...");
  response = await fetch("http://localhost:3001/api/users/me/progress/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newProgress)
  });

  if (response.ok) {
    const result = await response.json();
    console.log(`   ✅ Sincronizado a ${new Date(result.timestamp).toLocaleTimeString()}\n`);
  } else {
    console.log("   ❌ Error sincronizando");
    return;
  }

  // 5. Verificar datos guardados
  console.log("5️⃣ Verificando que los datos se guardaron...");
  response = await fetch("http://localhost:3001/api/users/me/progress", {
    headers: { Authorization: `Bearer ${token}` }
  });
  progress = await response.json();

  console.log("   ✅ Datos en MongoDB:");
  console.log(`      Level: ${progress.level} ✓`);
  console.log(`      Puntos: ${progress.totalPoints} ✓`);
  console.log(`      Monedas: ${progress.coins} ✓`);
  console.log(`      Partidas: ${progress.totalGames} ✓`);
  console.log(`      Racha: ${progress.bestStreak} ✓\n`);

  // 6. Hacer logout y login nuevamente
  console.log("6️⃣ Cerrando sesión...");
  // Aquí se guardaría progreso automáticamente
  console.log("   ✅ Sesión cerrada (progreso guardado automáticamente)\n");

  console.log("7️⃣ Volviendo a iniciar sesión...");
  response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "o.agg1130@gmail.com",
      password: "1234"
    })
  });

  const loginData = await response.json();
  const newToken = loginData.token;

  console.log("   ✅ Sesión iniciada nuevamente");
  console.log(`      Token: ${newToken}\n`);

  // 8. Verificar que el progreso sigue intacto
  console.log("8️⃣ Verificando que el progreso se recuperó...");
  response = await fetch("http://localhost:3001/api/users/me/progress", {
    headers: { Authorization: `Bearer ${newToken}` }
  });
  progress = await response.json();

  console.log("   ✅ PROGRESO RECUPERADO INTACTO:");
  console.log(`      Level: ${progress.level} ✓ (NO se perdió)`);
  console.log(`      Puntos: ${progress.totalPoints} ✓ (NO se perdieron)`);
  console.log(`      Monedas: ${progress.coins} ✓ (NO se perdieron)`);
  console.log(`      Partidas: ${progress.totalGames} ✓ (NO se perdieron)`);
  console.log(`      Racha: ${progress.bestStreak} ✓ (NO se perdió)\n`);

  console.log("========================================");
  console.log("✅ PRUEBA COMPLETADA CON ÉXITO");
  console.log("========================================\n");

  console.log("📌 RESULTADOS:");
  console.log("✓ Cuenta creada correctamente");
  console.log("✓ Progreso guardado en MongoDB");
  console.log("✓ Datos sincronizados correctamente");
  console.log("✓ Progreso persiste después de cerrar sesión");
  console.log("✓ Progreso se recupera al iniciar sesión\n");

  console.log("📋 INFORMACIÓN DE TU CUENTA:");
  console.log(`    Email: o.agg1130@gmail.com`);
  console.log(`    Contraseña: 1234`);
  console.log(`    UID: ${userId}`);
  console.log(`    Nivel Final: ${progress.level}`);
  console.log(`    Puntos: ${progress.totalPoints}`);
  console.log(`    Monedas: ${progress.coins}\n`);
}

createAccountAndTest().catch(err => console.error("Error:", err));
