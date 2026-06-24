// account.repository.ts

export class AccountRepository {
  async create(db: D1Database, userId: number): Promise<void> {
    await db
      .prepare(
        `
        INSERT INTO accounts (
          user_id,
          balance_cents
        )
        VALUES (?, 0)
        `,
      )
      .bind(userId)
      .run();
  }
}
