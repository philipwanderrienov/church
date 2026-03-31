-- public.accounts definition

-- Drop table

-- DROP TABLE public.accounts;

CREATE TABLE public.accounts (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	fullname varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"role" varchar(32) NOT NULL,
	username varchar NULL,
	CONSTRAINT accounts_pkey PRIMARY KEY (id)
);


-- public.accounts foreign keys

ALTER TABLE public.accounts ADD CONSTRAINT fk_congregation_account FOREIGN KEY (id) REFERENCES public.congregations(id) ON DELETE CASCADE;

INSERT INTO public.accounts (id,fullname,email,"role",username) VALUES
	 ('9f8f4fd5-10e8-4773-a542-7d1bfa44063f'::uuid,'Philip Wanderrienov','philip@email.com','pmj','philipsinaga'),
	 ('ad70bb51-5459-47d6-a68a-5b314b46c807'::uuid,'Veli Haloho','veli@email.com','jemaat','velihaloho');
