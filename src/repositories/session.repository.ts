import type { UserSessionEntity } from "../entities/session.entity";

export class SessionRepository {
  async findByRefreshToken(
    db: D1Database,
    refreshTokenUuid: string,
  ): Promise<UserSessionEntity | null> {
    const result = await db
      .prepare("SELECT * FROM user_sessions WHERE refresh_token_uuid = ?")
      .bind(refreshTokenUuid)
      .first<UserSessionEntity>();

    return result ?? null;
  }

  async createSession(
    db: D1Database,
    userId: number,
    refreshTokenUuid: string,
    expiresAt: string,
  ): Promise<UserSessionEntity> {
    const result = await db
      .prepare(
        "INSERT INTO user_sessions (user_id, refresh_token_uuid, expires_at) VALUES (?, ?, ?)",
      )
      .bind(userId, refreshTokenUuid, expiresAt)
      .run();

    return result.meta.last_row_id as number;
  }

  async revokeSession(db: D1Database, refreshToken: string): Promise<void> {
    await db
      .prepare("UPDATE user_sessions SET revoked = 1 WHERE id = ?")
      .bind(refreshToken)
      .run();
  }
}
