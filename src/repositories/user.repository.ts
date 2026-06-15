import type { UserEntity } from "../entities/user.entity";

export class UserRepository {
  async findByUsername(
    db: D1Database,
    username: string,
  ): Promise<UserEntity | null> {
    const result = await db
      .prepare("SELECT * FROM users WHERE username = ?")
      .bind(username)
      .first<UserEntity>();

    return result ?? null;
  }
}
