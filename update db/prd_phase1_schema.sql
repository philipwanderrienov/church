-- PRD Phase 1 schema additions for church-app backend
-- Target: support core business data directly in PostgreSQL
-- Existing tables assumed:
--   accounts, congregations, items

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- 1) WEEKLY READINGS
-- =========================================
CREATE TABLE IF NOT EXISTS weekly_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_date DATE NOT NULL UNIQUE,
    title TEXT NOT NULL,
    passage TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weekly_readings_service_date
    ON weekly_readings (service_date DESC);

-- =========================================
-- 2) WEEKLY WORSHIP WORKERS
-- =========================================
CREATE TABLE IF NOT EXISTS weekly_worship_workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_date DATE NOT NULL,
    service_name TEXT NOT NULL,
    worker_name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT,
    photo TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weekly_worship_workers_service_date
    ON weekly_worship_workers (service_date DESC);

CREATE INDEX IF NOT EXISTS idx_weekly_worship_workers_role
    ON weekly_worship_workers (role);

-- =========================================
-- 3) FULL TIMER STAFF
-- =========================================
CREATE TABLE IF NOT EXISTS full_timers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT,
    phone TEXT,
    photo TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_full_timers_active
    ON full_timers (active);

-- =========================================
-- 4) PMJ / ORGANIZATION MEMBERS
-- =========================================
CREATE TABLE IF NOT EXISTS pmj_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    congregation_id UUID UNIQUE REFERENCES congregations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    photo TEXT,
    phone TEXT,
    role_title TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pmj_members_active
    ON pmj_members (active);

-- =========================================
-- 5) CHURCH FINANCE
-- =========================================
CREATE TABLE IF NOT EXISTS church_finance_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_date DATE NOT NULL,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('income', 'expense')),
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(18,2) NOT NULL DEFAULT 0,
    reference_no TEXT,
    created_by UUID REFERENCES accounts(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_church_finance_entries_entry_date
    ON church_finance_entries (entry_date DESC);

CREATE INDEX IF NOT EXISTS idx_church_finance_entries_entry_type
    ON church_finance_entries (entry_type);

CREATE INDEX IF NOT EXISTS idx_church_finance_entries_category
    ON church_finance_entries (category);

-- =========================================
-- 6) SINTUA / SYAMAS BIOGRAPHIES
-- =========================================
CREATE TABLE IF NOT EXISTS church_leaders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    leader_type TEXT NOT NULL CHECK (leader_type IN ('sintua', 'syamas')),
    name TEXT NOT NULL,
    photo TEXT,
    birth_place TEXT,
    birth_date DATE,
    gender TEXT,
    phone TEXT,
    address TEXT,
    service_history TEXT,
    biography TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_church_leaders_leader_type
    ON church_leaders (leader_type);

CREATE INDEX IF NOT EXISTS idx_church_leaders_active
    ON church_leaders (active);

-- =========================================
-- 7) SECTION / MINISTRY SCHEDULES
-- =========================================
CREATE TABLE IF NOT EXISTS ministry_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_name TEXT NOT NULL,
    schedule_date DATE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    time_start TIME,
    time_end TIME,
    location TEXT,
    contact_name TEXT,
    contact_phone TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ministry_schedules_schedule_date
    ON ministry_schedules (schedule_date DESC);

CREATE INDEX IF NOT EXISTS idx_ministry_schedules_section_name
    ON ministry_schedules (section_name);

-- =========================================
-- 8) OPTIONAL LATER: BIRTHDAY / HEALTH ALERTS
-- =========================================
CREATE TABLE IF NOT EXISTS congregation_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    congregation_id UUID REFERENCES congregations(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('birthday', 'anniversary', 'sick')),
    alert_date DATE NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_congregation_alerts_alert_type
    ON congregation_alerts (alert_type);

CREATE INDEX IF NOT EXISTS idx_congregation_alerts_alert_date
    ON congregation_alerts (alert_date DESC);

-- =========================================
-- 9) OPTIONAL LATER: ALTAR FLOWER OFFERINGS
-- =========================================
CREATE TABLE IF NOT EXISTS altar_flower_offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offering_date DATE NOT NULL UNIQUE,
    congregation_id UUID REFERENCES congregations(id) ON DELETE SET NULL,
    congregation_name TEXT,
    phone TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_altar_flower_offerings_offering_date
    ON altar_flower_offerings (offering_date DESC);

-- =========================================
-- 10) OPTIONAL LATER: UPLOADED IMPORT BATCHES
-- =========================================
CREATE TABLE IF NOT EXISTS import_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_type TEXT NOT NULL,
    source_file_name TEXT NOT NULL,
    source_provider TEXT,
    processed_rows INTEGER NOT NULL DEFAULT 0,
    success_rows INTEGER NOT NULL DEFAULT 0,
    failed_rows INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    error_report TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_import_batches_batch_type
    ON import_batches (batch_type);

CREATE INDEX IF NOT EXISTS idx_import_batches_status
    ON import_batches (status);

-- =========================================
-- 11) UPDATED AT TRIGGER HELPER
-- =========================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_weekly_readings'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_weekly_readings
        BEFORE UPDATE ON weekly_readings
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_weekly_worship_workers'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_weekly_worship_workers
        BEFORE UPDATE ON weekly_worship_workers
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_full_timers'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_full_timers
        BEFORE UPDATE ON full_timers
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_pmj_members'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_pmj_members
        BEFORE UPDATE ON pmj_members
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_church_finance_entries'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_church_finance_entries
        BEFORE UPDATE ON church_finance_entries
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_church_leaders'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_church_leaders
        BEFORE UPDATE ON church_leaders
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_ministry_schedules'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_ministry_schedules
        BEFORE UPDATE ON ministry_schedules
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_congregation_alerts'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_congregation_alerts
        BEFORE UPDATE ON congregation_alerts
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_altar_flower_offerings'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_altar_flower_offerings
        BEFORE UPDATE ON altar_flower_offerings
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_set_updated_at_import_batches'
    ) THEN
        CREATE TRIGGER trigger_set_updated_at_import_batches
        BEFORE UPDATE ON import_batches
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

-- =========================================
-- 12) DUMMY DATA SEEDS
-- =========================================

INSERT INTO weekly_readings (id, service_date, title, passage, notes) VALUES
    ('11111111-1111-1111-1111-111111111111'::uuid, '2026-04-12', 'Easter Sunday', 'John 20:1-18', 'He is risen'),
    ('11111111-1111-1111-1111-111111111112'::uuid, '2026-04-19', 'Walking in New Life', 'Romans 6:1-14', 'New life in Christ'),
    ('11111111-1111-1111-1111-111111111113'::uuid, '2026-04-26', 'Shepherding the Flock', '1 Peter 5:1-11', 'Faithful service')
ON CONFLICT (id) DO NOTHING;

INSERT INTO weekly_worship_workers (id, service_date, service_name, worker_name, role, phone, photo, notes) VALUES
    ('22222222-2222-2222-2222-222222222221'::uuid, '2026-04-12', 'Sunday Service', 'Pdt. Andreas', 'Preacher', '081234567890', NULL, 'Main service preacher'),
    ('22222222-2222-2222-2222-222222222222'::uuid, '2026-04-12', 'Sunday Service', 'Maria Simbolon', 'Singer', '081234567891', NULL, 'Lead worship singer'),
    ('22222222-2222-2222-2222-222222222223'::uuid, '2026-04-12', 'Sunday Service', 'Daniel Siahaan', 'Liturgy', '081234567892', NULL, 'Service liturgy leader')
ON CONFLICT (id) DO NOTHING;

INSERT INTO full_timers (id, name, title, phone, photo, active, notes) VALUES
    ('33333333-3333-3333-3333-333333333331'::uuid, 'Pdt. Andreas', 'Senior Pastor', '081234567890', NULL, TRUE, 'Coordinates worship and pastoral care'),
    ('33333333-3333-3333-3333-333333333332'::uuid, 'Suster Maria', 'Ministry Staff', '081234567891', NULL, TRUE, 'Handles administration'),
    ('33333333-3333-3333-3333-333333333333'::uuid, 'Diaken Lukas', 'Liturgy Coordinator', '081234567892', NULL, TRUE, 'Supports service flow')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pmj_members (id, congregation_id, name, photo, phone, role_title, active, notes) VALUES
    ('44444444-4444-4444-4444-444444444441'::uuid, NULL, 'Bapak Samuel', NULL, '081234567893', 'Chairperson', TRUE, 'PMJ leader'),
    ('44444444-4444-4444-4444-444444444442'::uuid, NULL, 'Ibu Ester', NULL, '081234567894', 'Secretary', TRUE, 'PMJ secretary'),
    ('44444444-4444-4444-4444-444444444443'::uuid, NULL, 'Bapak Daniel', NULL, '081234567895', 'Member', TRUE, 'Active PMJ member')
ON CONFLICT (id) DO NOTHING;

INSERT INTO church_finance_entries (id, entry_date, entry_type, category, description, amount, reference_no, created_by, notes) VALUES
    ('55555555-5555-5555-5555-555555555551'::uuid, '2026-04-01', 'income', 'Offering', 'Sunday offering collection', 1500000, 'FIN-2026-001', NULL, 'Weekly worship offering'),
    ('55555555-5555-5555-5555-555555555552'::uuid, '2026-04-03', 'income', 'Tithe', 'Monthly tithe from members', 3200000, 'FIN-2026-002', NULL, 'Tithe batch'),
    ('55555555-5555-5555-5555-555555555553'::uuid, '2026-04-05', 'expense', 'Utilities', 'Electricity and water', 850000, 'FIN-2026-003', NULL, 'Monthly utility payment')
ON CONFLICT (id) DO NOTHING;

INSERT INTO church_leaders (id, leader_type, name, photo, birth_place, birth_date, gender, phone, address, service_history, biography, active, sort_order) VALUES
    ('66666666-6666-6666-6666-666666666661'::uuid, 'sintua', 'Bapak Markus', NULL, 'Tarutung', '1970-02-10', 'Male', '081234567896', 'Jl. Gereja No. 1', 'Elder since 2015', 'Faithful church elder with strong pastoral heart.', TRUE, 1),
    ('66666666-6666-6666-6666-666666666662'::uuid, 'syamas', 'Ibu Ruth', NULL, 'Medan', '1978-08-15', 'Female', '081234567897', 'Jl. Kasih No. 2', 'Deaconess since 2018', 'Serves in worship coordination and care ministry.', TRUE, 2),
    ('66666666-6666-6666-6666-666666666663'::uuid, 'sintua', 'Bapak Jonas', NULL, 'Pematangsiantar', '1965-11-21', 'Male', '081234567898', 'Jl. Damai No. 3', 'Previously chaired the board', 'Experienced leader and counselor.', TRUE, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO ministry_schedules (id, section_name, schedule_date, title, description, time_start, time_end, location, contact_name, contact_phone, active) VALUES
    ('77777777-7777-7777-7777-777777777771'::uuid, 'Youth', '2026-04-18', 'Youth Bible Study', 'Weekly youth group meeting', '18:30', '20:00', 'Youth Center', 'Timothy', '081234567899', TRUE),
    ('77777777-7777-7777-7777-777777777772'::uuid, 'Women', '2026-04-20', 'Women Prayer Fellowship', 'Monthly women prayer gathering', '19:00', '20:30', 'Church Hall', 'Sarah', '081234567800', TRUE),
    ('77777777-7777-7777-7777-777777777773'::uuid, 'General', '2026-04-22', 'Leadership Meeting', 'Monthly leadership team meeting', '10:00', '12:00', 'Conference Room', 'Andreas', '081234567801', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO congregation_alerts (id, congregation_id, alert_type, alert_date, title, message, resolved) VALUES
    ('88888888-8888-8888-8888-888888888881'::uuid, NULL, 'birthday', '2026-04-14', 'Birthday: John Sihotang', 'Remember to send a birthday blessing.', FALSE),
    ('88888888-8888-8888-8888-888888888882'::uuid, NULL, 'sick', '2026-04-15', 'Pray for Maria Simbolon', 'Please pray for recovery after surgery.', FALSE),
    ('88888888-8888-8888-8888-888888888883'::uuid, NULL, 'anniversary', '2026-04-16', 'Wedding Anniversary: David and Ruth', 'Send congratulations and blessing.', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO altar_flower_offerings (id, offering_date, congregation_id, congregation_name, phone, notes) VALUES
    ('99999999-9999-9999-9999-999999999991'::uuid, '2026-04-12', NULL, 'John Sihotang Family', '081234567890', 'Flowers for Easter service'),
    ('99999999-9999-9999-9999-999999999992'::uuid, '2026-04-19', NULL, 'Maria Simbolon Family', '081234567891', 'Flowers for Sunday worship')
ON CONFLICT (id) DO NOTHING;

INSERT INTO import_batches (id, batch_type, source_file_name, source_provider, processed_rows, success_rows, failed_rows, status, error_report) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'::uuid, 'congregations', 'congregants_april.csv', 'manual', 25, 25, 0, 'completed', NULL),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'::uuid, 'finance', 'finance_april.csv', 'manual', 12, 11, 1, 'completed', '1 row had invalid amount'),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'::uuid, 'weekly_readings', 'weekly_readings_seed.csv', 'manual', 3, 3, 0, 'completed', NULL)
ON CONFLICT (id) DO NOTHING;

COMMIT;
