import type { Context } from "hono";
import type { Env } from "../types/env";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { SessionRepository } from "../repositories/session.repository";

const authService = new AuthService(
  new UserRepository(),
  new SessionRepository(),
);

export class AuthController {
  static async login(c: Context<Env>) {
    try {
      const body = await c.req.json();

      const result = await authService.login(c.env.friendbank_db, body);

      return c.json(result, 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      return c.json({ success: false, message }, 401);
    }
  }
}
