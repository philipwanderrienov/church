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
	username varchar(100) NULL,
	passwordhash varchar(255) NULL,
	CONSTRAINT congregations_pkey PRIMARY KEY (id)
);