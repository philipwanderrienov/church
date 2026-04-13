-- PostgreSQL schema for Church.Api
-- Self-contained manual execution script

BEGIN;

DROP TABLE IF EXISTS "Events" CASCADE;
DROP TABLE IF EXISTS "Announcements" CASCADE;
DROP TABLE IF EXISTS "FinanceTransactions" CASCADE;
DROP TABLE IF EXISTS "PrayerRequests" CASCADE;
DROP TABLE IF EXISTS "Organizations" CASCADE;
DROP TABLE IF EXISTS "Congregations" CASCADE;

CREATE TABLE "Congregations" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" TEXT NOT NULL,
    "PastorName" TEXT NULL,
    "Location" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL DEFAULT '',
    "Email" TEXT NOT NULL DEFAULT '',
    "ActiveMembersCount" INTEGER NOT NULL DEFAULT 0,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "PrayerRequests" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "CongregationId" UUID NULL,
    "RequestedBy" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Details" TEXT NOT NULL,
    "Priority" TEXT NOT NULL DEFAULT 'Normal',
    "IsAnswered" BOOLEAN NOT NULL DEFAULT FALSE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "FK_PrayerRequests_Congregations_CongregationId"
        FOREIGN KEY ("CongregationId")
        REFERENCES "Congregations" ("Id")
        ON DELETE SET NULL
);

CREATE TABLE "FinanceTransactions" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "CongregationId" UUID NULL,
    "TransactionDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "Type" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Amount" NUMERIC(12,2) NOT NULL,
    "Reference" TEXT NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "FK_FinanceTransactions_Congregations_CongregationId"
        FOREIGN KEY ("CongregationId")
        REFERENCES "Congregations" ("Id")
        ON DELETE SET NULL
);

CREATE TABLE "Organizations" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" TEXT NOT NULL,
    "Description" TEXT NULL,
    "LeaderName" TEXT NOT NULL,
    "Category" TEXT NOT NULL DEFAULT 'Ministry',
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "Announcements" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Audience" TEXT NOT NULL DEFAULT 'All',
    "PublishDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "Events" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Title" TEXT NOT NULL,
    "Description" TEXT NULL,
    "Location" TEXT NOT NULL,
    "StartDateTime" TIMESTAMPTZ NOT NULL,
    "EndDateTime" TIMESTAMPTZ NULL,
    "CongregationId" UUID NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "FK_Events_Congregations_CongregationId"
        FOREIGN KEY ("CongregationId")
        REFERENCES "Congregations" ("Id")
        ON DELETE SET NULL
);

CREATE INDEX "IX_PrayerRequests_CongregationId" ON "PrayerRequests" ("CongregationId");
CREATE INDEX "IX_FinanceTransactions_CongregationId" ON "FinanceTransactions" ("CongregationId");
CREATE INDEX "IX_Events_CongregationId" ON "Events" ("CongregationId");

COMMIT;
