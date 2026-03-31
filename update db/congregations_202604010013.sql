-- public.congregations definition

-- Drop table

-- DROP TABLE public.congregations;

CREATE TABLE public.congregations (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	fullname varchar(255) NOT NULL,
	gender varchar NOT NULL,
	dateofbirth varchar NOT NULL,
	phone varchar NOT NULL,
	email varchar NOT NULL,
	"role" varchar(32) NOT NULL,
	address varchar NOT NULL,
	maritalstatus varchar NOT NULL,
	familycardnumber varchar NOT NULL,
	sector varchar NOT NULL,
	joindate varchar NOT NULL,
	photo varchar NULL,
	username varchar(100) NOT NULL,
	passwordhash varchar(255) NOT NULL,
	CONSTRAINT congregations_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger trigger_sync_to_accounts after
insert
    or
update
    on
    public.congregations for each row execute function insert_into_accounts();

INSERT INTO public.congregations (id,fullname,gender,dateofbirth,phone,email,"role",address,maritalstatus,familycardnumber,sector,joindate,photo,username,passwordhash) VALUES
	 ('9f8f4fd5-10e8-4773-a542-7d1bfa44063f'::uuid,'Philip Wanderrienov','Male','03/11/1999','082249224918','philip@email.com','pmj','karawaci, tangerang','single','123123','6','01/06/2026',NULL,'philipsinaga','$2a$10$7w4Y9n1qR4M7gJ2m4qfQ5e9m1XK6Jp9X0w1vN9h2nq6g3fQeYQ1bG'),
	 ('ad70bb51-5459-47d6-a68a-5b314b46c807'::uuid,'Veli Haloho','Female','10/02/1998','089598765432','veli@email.com','jemaat','taman cibodas, tangerang','single','987987','3','01/06/2026',NULL,'velihaloho','$2a$10$7w4Y9n1qR4M7gJ2m4qfQ5e9m1XK6Jp9X0w1vN9h2nq6g3fQeYQ1bG');
