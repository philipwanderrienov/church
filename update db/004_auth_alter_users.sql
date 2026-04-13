-- Alter existing Users table for .NET auth login with hashed passwords
-- Safe to run on an existing database before using the new login endpoint.
-- Default seeded/demo password in this script is: password

BEGIN;

ALTER TABLE "Users"
    ADD COLUMN IF NOT EXISTS "Username" TEXT NULL,
    ADD COLUMN IF NOT EXISTS "PasswordHash" TEXT NULL;

UPDATE "Users"
SET "Username" = LOWER(SPLIT_PART("Email", '@', 1))
WHERE ("Username" IS NULL OR BTRIM("Username") = '')
  AND "Email" IS NOT NULL;

WITH duplicates AS (
    SELECT
        "Id",
        LOWER(SPLIT_PART("Email", '@', 1)) || '_' ||
        ROW_NUMBER() OVER (
            PARTITION BY LOWER(SPLIT_PART("Email", '@', 1))
            ORDER BY "CreatedAt", "Id"
        ) AS generated_username
    FROM "Users"
)
UPDATE "Users" u
SET "Username" = d.generated_username
FROM duplicates d
WHERE u."Id" = d."Id"
  AND EXISTS (
      SELECT 1
      FROM "Users" u2
      WHERE u2."Id" <> u."Id"
        AND LOWER(COALESCE(u2."Username", '')) = LOWER(COALESCE(u."Username", ''))
  );

UPDATE "Users"
SET "PasswordHash" = '$2a$11$N9qo8uLOickgx2ZMRZoMye0F9suyJZurELyX7g8I4K5rR9Ff1/5Sy'
WHERE "PasswordHash" IS NULL OR BTRIM("PasswordHash") = '';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'CK_Users_PasswordHash_NotEmpty'
    ) THEN
        ALTER TABLE "Users"
        ADD CONSTRAINT "CK_Users_PasswordHash_NotEmpty"
        CHECK (BTRIM("PasswordHash") <> '');
    END IF;
END $$;

ALTER TABLE "Users"
    ALTER COLUMN "PasswordHash" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "IX_Users_Username" ON "Users" ("Username");
CREATE INDEX IF NOT EXISTS "IX_Users_Email" ON "Users" ("Email");

COMMIT;

-- Notes:
-- 1. Demo/default password for accounts updated by this script: password
-- 2. After first login rollout, strongly recommended to replace demo hashes per user.
-- 3. To generate a new bcrypt hash in .NET:
--    BCrypt.Net.BCrypt.HashPassword("your-plain-password")
