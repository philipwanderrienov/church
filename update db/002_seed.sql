-- PostgreSQL seed data for Church.Api
-- Assumes schema from 001_schema.sql has already been applied

BEGIN;

INSERT INTO "Congregations" ("Id", "Name", "PastorName", "Location", "PhoneNumber", "Email", "ActiveMembersCount", "CreatedAt", "UpdatedAt")
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Grace Community Church', 'Rev. Daniel Mwangi', 'Nairobi, Kenya', '+254700000000', 'grace@example.com', 245, NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'Hope Chapel', 'Rev. Sarah Otieno', 'Mombasa, Kenya', '+254700000000', 'hope@example.com', 132, NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', 'New Life Fellowship', 'Pastor Peter Okello', 'Kisumu, Kenya', '+254700000000', 'newlife@example.com', 89, NOW(), NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "Name" = EXCLUDED."Name",
    "PastorName" = EXCLUDED."PastorName",
    "Location" = EXCLUDED."Location",
    "PhoneNumber" = EXCLUDED."PhoneNumber",
    "Email" = EXCLUDED."Email",
    "ActiveMembersCount" = EXCLUDED."ActiveMembersCount",
    "UpdatedAt" = NOW();

INSERT INTO "PrayerRequests" ("Id", "CongregationId", "RequestedBy", "Title", "Details", "Priority", "IsAnswered", "CreatedAt")
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Mary Wanjiku', 'Healing for father', 'Please pray for healing and strength for my father during treatment.', 'High', FALSE, NOW()),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Peter Odhiambo', 'Job opportunity', 'Praying for open doors in employment this month.', 'Normal', FALSE, NOW()),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', NULL, 'Anonymous', 'Church expansion', 'Seeking wisdom and provision for church growth plans.', 'High', TRUE, NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "CongregationId" = EXCLUDED."CongregationId",
    "RequestedBy" = EXCLUDED."RequestedBy",
    "Title" = EXCLUDED."Title",
    "Details" = EXCLUDED."Details",
    "Priority" = EXCLUDED."Priority",
    "IsAnswered" = EXCLUDED."IsAnswered",
    "CreatedAt" = EXCLUDED."CreatedAt";

INSERT INTO "FinanceTransactions" ("Id", "CongregationId", "TransactionDate", "Type", "Category", "Description", "Amount", "Reference", "CreatedAt")
VALUES
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', '2025-01-05', 'Income', 'Tithe', 'Sunday tithe offering', 125000.00, 'TITH-2025-0001', NOW()),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', '2025-01-08', 'Expense', 'Utilities', 'Electricity bill payment', 18500.00, 'UTIL-2025-0002', NOW()),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', '2025-01-10', 'Income', 'Donation', 'Special thanksgiving donation', 76000.00, 'DON-2025-0003', NOW()),
    ('99999999-9999-9999-9999-999999999999', '33333333-3333-3333-3333-333333333333', '2025-01-12', 'Expense', 'Events', 'Youth conference refreshments', 22000.00, 'EVT-2025-0004', NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "CongregationId" = EXCLUDED."CongregationId",
    "TransactionDate" = EXCLUDED."TransactionDate",
    "Type" = EXCLUDED."Type",
    "Category" = EXCLUDED."Category",
    "Description" = EXCLUDED."Description",
    "Amount" = EXCLUDED."Amount",
    "Reference" = EXCLUDED."Reference",
    "CreatedAt" = EXCLUDED."CreatedAt";

INSERT INTO "Organizations" ("Id", "Name", "Description", "LeaderName", "Category", "CreatedAt")
VALUES
    ('44444444-4444-4444-4444-444444444444', 'Women Ministry', 'Supports women discipleship and outreach.', 'Mrs. Rebecca Mwangi', 'Ministry', NOW()),
    ('55555555-5555-5555-5555-555555555555', 'Youth Fellowship', 'Youth-focused teaching and community activities.', 'Mr. Isaac Njoroge', 'Fellowship', NOW()),
    ('66666666-6666-6666-6666-666666666666', 'Worship Team', 'Leads Sunday worship and special services.', 'Ms. Esther Auma', 'Service', NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "Name" = EXCLUDED."Name",
    "Description" = EXCLUDED."Description",
    "LeaderName" = EXCLUDED."LeaderName",
    "Category" = EXCLUDED."Category",
    "CreatedAt" = EXCLUDED."CreatedAt";

INSERT INTO "Announcements" ("Id", "Title", "Content", "Audience", "PublishDate", "IsActive", "CreatedAt")
VALUES
    ('77777777-7777-7777-7777-777777777777', 'Sunday Service Time Change', 'Sunday service will start at 9:00 AM from next week.', 'All', '2025-01-03', TRUE, NOW()),
    ('88888888-8888-8888-8888-888888888888', 'Prayer Night', 'Join us for an all-night prayer session on Friday at 10:00 PM.', 'All', '2025-01-09', TRUE, NOW()),
    ('aaaaaaaa-1111-1111-1111-111111111112', 'Leadership Meeting', 'Congregation leaders will meet after service on Sunday.', 'Leaders', '2025-01-11', TRUE, NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "Title" = EXCLUDED."Title",
    "Content" = EXCLUDED."Content",
    "Audience" = EXCLUDED."Audience",
    "PublishDate" = EXCLUDED."PublishDate",
    "IsActive" = EXCLUDED."IsActive",
    "CreatedAt" = EXCLUDED."CreatedAt";

INSERT INTO "Events" ("Id", "Title", "Description", "Location", "StartDateTime", "EndDateTime", "CongregationId", "CreatedAt")
VALUES
    ('bbbbbbbb-1111-1111-1111-111111111113', 'Sunday Worship', 'Weekly worship service', 'Main Sanctuary', '2025-01-19 09:00:00+00', '2025-01-19 11:30:00+00', '11111111-1111-1111-1111-111111111111', NOW()),
    ('cccccccc-1111-1111-1111-111111111114', 'Youth Bible Study', 'Weekly study and discussion', 'Hall B', '2025-01-22 18:00:00+00', '2025-01-22 19:30:00+00', '33333333-3333-3333-3333-333333333333', NOW()),
    ('dddddddd-1111-1111-1111-111111111115', 'Community Outreach', 'Food and clothing distribution', 'Town Center', '2025-01-25 08:00:00+00', '2025-01-25 12:00:00+00', '22222222-2222-2222-2222-222222222222', NOW())
ON CONFLICT ("Id") DO UPDATE
SET
    "Title" = EXCLUDED."Title",
    "Description" = EXCLUDED."Description",
    "Location" = EXCLUDED."Location",
    "StartDateTime" = EXCLUDED."StartDateTime",
    "EndDateTime" = EXCLUDED."EndDateTime",
    "CongregationId" = EXCLUDED."CongregationId",
    "CreatedAt" = EXCLUDED."CreatedAt";

COMMIT;
