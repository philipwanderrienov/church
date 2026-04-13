-- PostgreSQL schema + seed for Church.Api users/jemaat
-- This file adds a new Users table and seeds it with sample data.

BEGIN;

CREATE TABLE IF NOT EXISTS "Users" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "CongregationId" UUID NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL UNIQUE,
    "Username" TEXT NULL UNIQUE,
    "PasswordHash" TEXT NOT NULL DEFAULT '',
    "PhoneNumber" TEXT NULL,
    "Role" TEXT NOT NULL DEFAULT 'Member',
    "Gender" TEXT NULL,
    "BirthDate" DATE NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "FK_Users_Congregations_CongregationId"
        FOREIGN KEY ("CongregationId")
        REFERENCES "Congregations" ("Id")
        ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IX_Users_CongregationId" ON "Users" ("CongregationId");
CREATE INDEX IF NOT EXISTS "IX_Users_Email" ON "Users" ("Email");

INSERT INTO "Users" (
    "Id",
    "CongregationId",
    "FirstName",
    "LastName",
    "Email",
    "Username",
    "PasswordHash",
    "PhoneNumber",
    "Role",
    "Gender",
    "BirthDate",
    "Status",
    "CreatedAt",
    "UpdatedAt"
)
VALUES
    ('aaaaaaaa-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'John', 'Kamau', 'john.kamau@example.com', 'johnkamau', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+254700000101', 'Choir', 'Male', '1992-04-12', 'Active', NOW(), NOW()),
    ('aaaaaaaa-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Mary', 'Wanjiku', 'mary.wanjiku@example.com', 'marywanjiku', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+254700000102', 'Usher', 'Female', '1995-08-03', 'Active', NOW(), NOW()),
    ('aaaaaaaa-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'Peter', 'Odhiambo', 'peter.odhiambo@example.com', 'peterodhiambo', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+254700000103', 'Member', 'Male', '1990-11-22', 'Active', NOW(), NOW()),
    ('aaaaaaaa-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'Grace', 'Achieng', 'grace.achieng@example.com', 'graceachieng', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+254700000104', 'Youth Leader', 'Female', '1998-02-17', 'Active', NOW(), NOW()),
    ('aaaaaaaa-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'Samuel', 'Njoroge', 'samuel.njoroge@example.com', 'samuelnjoroge', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+254700000105', 'Member', 'Male', '1989-07-28', 'Inactive', NOW(), NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "CongregationId" = EXCLUDED."CongregationId",
    "FirstName" = EXCLUDED."FirstName",
    "LastName" = EXCLUDED."LastName",
    "Email" = EXCLUDED."Email",
    "Username" = EXCLUDED."Username",
    "PasswordHash" = EXCLUDED."PasswordHash",
    "PhoneNumber" = EXCLUDED."PhoneNumber",
    "Role" = EXCLUDED."Role",
    "Gender" = EXCLUDED."Gender",
    "BirthDate" = EXCLUDED."BirthDate",
    "Status" = EXCLUDED."Status",
    "UpdatedAt" = NOW();

COMMIT;
