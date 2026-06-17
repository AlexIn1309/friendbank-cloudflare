import { UserRepository } from "../repositories/user.repository";
import { verifyPassword } from "../utils/password";
import { generateUUID } from "../utils/uuid";

import type { LoginRequestDto } from "../dtos/auth/login-request.dto";
import type { LoginResponseDto } from "../dtos/auth/login-response.dto";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: sessionRepository,
  ) {}

  async login(
    db: D1Database,
    loginRequest: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByUsername(
      db,
      loginRequest.username,
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const validPassword = await verifyPassword(
      loginRequest.password,
      user.password_hash,
    );

    if (!validPassword) {
      throw new Error("Invalid username or password");
    }

    const refreshToken = generateUUID();

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    await this.sessionRepository.createSession(
      db,
      user.id,
      refreshToken,
      expiresAt,
    );

    return {
      accessToken: "pending",
      refreshToken,
    };
  }
}
