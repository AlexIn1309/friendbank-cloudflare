import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";

const authService = new AuthService(new UserRepository());

export class AuthController {
	static async login(c: any) {
		try {
			const body = await c.req.json();

			const result = await authService.login(c.env.DB, body);

			return c.json(result, 200);

		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";
			return c.json({ success: false, message: error.message }, 401);
		}
	}
}
