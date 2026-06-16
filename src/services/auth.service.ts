import { UserRepository } from "../repositories/user.repository";
import { verifyPassword } from "../utils/password";

import type { LoginRequestDto } from "../dtos/auth/login-request.dto";
import type { LoginResponseDto } from "../dtos/auth/login-response.dto";

export class AuthService {

  constructor(private readonly userRepository: UserRepository) {}

  async login(
    db: D1Database,
    loginRequest: LoginRequestDto,
  ): Promise<LoginResponseDto> {

    const user = await this.userRepository.findByUsername(db, loginRequest.username);

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

    return {
      accessToken: "pending",
      refreshToken: "pending",
    };
  }
}

