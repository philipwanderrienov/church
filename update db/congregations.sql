-- public.congregations definition

-- Drop table

-- DROP TABLE public.congregations;

CREATE TABLE public.congregations (
	id varchar(255) NOT NULL,
	fullname varchar(255) NOT NULL,
	gender varchar NULL,
	dateofbirth varchar NULL,
	phone varchar NULL,
	email varchar NULL,
	address varchar NULL,
	maritalstatus varchar NULL,
	familycardnumber varchar NULL,
	classsector varchar NULL,
	rayon varchar NULL,
	joindate varchar NULL,
	photo varchar NULL,
	CONSTRAINT congregations_pkey PRIMARY KEY (id)
);

-- accounts role support and id correlation with congregations
ALTER TABLE public.accounts
	DROP COLUMN IF EXISTS congregation_id;

ALTER TABLE public.accounts
	ADD COLUMN IF NOT EXISTS role varchar(32) NOT NULL DEFAULT 'jemaat';

UPDATE public.accounts
SET role = 'jemaat'
WHERE role IS NULL OR role = '';

UPDATE public.accounts a
SET role = 'jemaat'
FROM public.congregations c
WHERE a.id = c.id
  AND (a.role IS NULL OR a.role = '' OR a.role NOT IN ('admin', 'jemaat'));

ALTER TABLE public.accounts
	ALTER COLUMN role SET NOT NULL;

DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'accounts_role_check'
	) THEN
		ALTER TABLE public.accounts
		ADD CONSTRAINT accounts_role_check CHECK (role IN ('admin', 'jemaat'));
	END IF;
END $$;