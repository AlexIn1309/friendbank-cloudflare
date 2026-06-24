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
      console.log(c.env.JWT_SECRET);
      console.log(c.env.JWT_SECRET?.length);
      const result = await authService.login(
        c.env.friendbank_db,
        c.env.JWT_SECRET,
        body,
      );

      return c.json(result, 200);
    } catch (error) {
      if (error instanceof AppError) {
        return c.json({ message: error.message }, error.statusCode);
      }

      return c.json({ message: "Internal Server error" }, 500);
    }
  }
  static async refreshToken(c: Context<Env>) {
    try {
      const body = await c.req.json();

      const result = await authService.refreshToken(
        c.env.friendbank_db,
        c.env.JWT_SECRET,
        body.refreshToken,
      );

      return c.json(result, 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      return c.json({ success: false, message }, 401);
    }
  }
}
