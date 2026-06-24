import type { JwtPayloadDto } from "../dtos/auth/jwt-payloads";

export interface Env {
  Bindings: {
    friendbank_db: D1Database;
    JWT_SECRET: string;
  };

  Variables: {
    user: JwtPayloadDto;
  };
}
