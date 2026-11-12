import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, type z, type ZodTypeAny } from "zod";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Envuelve un handler async para que los errores lleguen al middleware de errores. */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => unknown): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export function parseBody<S extends ZodTypeAny>(schema: S, body: unknown): z.infer<S> {
  const result = schema.safeParse(body);
  if (!result.success) {
    const first = result.error.issues[0];
    throw new HttpError(400, first ? `${first.path.join(".") || "datos"}: ${first.message}` : "Datos inválidos");
  }
  return result.data;
}

export function parseId(value: string): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) throw new HttpError(400, "Identificador inválido");
  return n;
}

export { ZodError };
