ALTER TABLE users
ADD COLUMN failed_login_attempts INTEGER DEFAULT 0;
