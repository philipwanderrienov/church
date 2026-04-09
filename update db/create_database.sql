-- PostgreSQL schema for church-app backend
-- This version keeps `accounts` synchronized with `congregations` via trigger/function.

BEGIN;

-- Required for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- ACCOUNTS
-- =========================================
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fullname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'jemaat',
    username TEXT NOT NULL UNIQUE,
    passwordhash TEXT
);

CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts (email);
CREATE INDEX IF NOT EXISTS idx_accounts_username ON accounts (username);
CREATE INDEX IF NOT EXISTS idx_accounts_role ON accounts (role);

-- =========================================
-- CONGREGATIONS
-- =========================================
CREATE TABLE IF NOT EXISTS congregations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fullname TEXT NOT NULL,
    gender TEXT NOT NULL,
    dateofbirth TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    address TEXT NOT NULL,
    maritalstatus TEXT NOT NULL,
    familycardnumber TEXT NOT NULL,
    sector TEXT NOT NULL,
    joindate TEXT NOT NULL,
    photo TEXT,
    username TEXT NOT NULL UNIQUE,
    passwordhash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_congregations_email ON congregations (email);
CREATE INDEX IF NOT EXISTS idx_congregations_username ON congregations (username);
CREATE INDEX IF NOT EXISTS idx_congregations_role ON congregations (role);
CREATE INDEX IF NOT EXISTS idx_congregations_sector ON congregations (sector);

-- =========================================
-- TRIGGER FUNCTION: sync congregations -> accounts
-- =========================================
CREATE OR REPLACE FUNCTION insert_into_accounts()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO accounts (id, fullname, email, role, username, passwordhash)
    VALUES (NEW.id, NEW.fullname, NEW.email, NEW.role, NEW.username, NEW.passwordhash)
    ON CONFLICT (id) DO UPDATE
    SET
        fullname = EXCLUDED.fullname,
        email = EXCLUDED.email,
        role = EXCLUDED.role,
        username = EXCLUDED.username,
        passwordhash = EXCLUDED.passwordhash;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_to_accounts ON congregations;

CREATE TRIGGER trigger_sync_to_accounts
AFTER INSERT OR UPDATE ON congregations
FOR EACH ROW
EXECUTE FUNCTION insert_into_accounts();

-- =========================================
-- ITEMS
-- =========================================
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    quantity INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_items_name ON items (name);
CREATE INDEX IF NOT EXISTS idx_items_category ON items (category);

COMMIT;

-- Seed data examples from your current congregations table
INSERT INTO congregations (id, fullname, gender, dateofbirth, phone, email, role, address, maritalstatus, familycardnumber, sector, joindate, photo, username, passwordhash) VALUES
    ('9f8f4fd5-10e8-4773-a542-7d1bfa44063f'::uuid, 'Philip Wanderrienov', 'Male', '03/11/1999', '082249224918', 'philip@email.com', 'pmj', 'karawaci, tangerang', 'single', '123123', '6', '01/06/2026', NULL, 'philipsinaga', '$2a$10$7w4Y9n1qR4M7gJ2m4qfQ5e9m1XK6Jp9X0w1vN9h2nq6g3fQeYQ1bG'),
    ('ad70bb51-5459-47d6-a68a-5b314b46c807'::uuid, 'Veli Haloho', 'Female', '10/02/1998', '089598765432', 'veli@email.com', 'jemaat', 'taman cibodas, tangerang', 'single', '987987', '3', '01/06/2026', NULL, 'velihaloho', '$2a$10$7w4Y9n1qR4M7gJ2m4qfQ5e9m1XK6Jp9X0w1vN9h2nq6g3fQeYQ1bG')
ON CONFLICT (id) DO NOTHING;
