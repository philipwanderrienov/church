-- public.accounts definition

-- Drop table

-- DROP TABLE public.accounts;

CREATE TABLE public.accounts (
	id varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"role" varchar(32) DEFAULT 'jemaat'::character varying NOT NULL,
	CONSTRAINT accounts_email_key UNIQUE (email),
	CONSTRAINT accounts_pkey PRIMARY KEY (id),
	CONSTRAINT accounts_role_check CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('jemaat'::character varying)::text])))
);