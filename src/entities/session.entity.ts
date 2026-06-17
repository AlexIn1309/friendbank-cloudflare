export interface UserSessionEntity {
  id: string;
  user_id: number;
  refresh_token_uuid: string;
  expires_at: string;
  created_at: string;
  revoked: number;
}
