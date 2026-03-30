{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 -- public.congregations definition\
\
-- Drop table\
\
-- DROP TABLE public.congregations;\
\
CREATE TABLE public.congregations (\
	id varchar(255) NOT NULL,\
	fullname varchar(255) NOT NULL,\
	gender varchar NULL,\
	dateofbirth varchar NULL,\
	phone varchar NULL,\
	email varchar NULL,\
	address varchar NULL,\
	maritalstatus varchar NULL,\
	familycardnumber varchar NULL,\
	classsector varchar NULL,\
	rayon varchar NULL,\
	joindate varchar NULL,\
	photo varchar NULL,\
	username varchar(100) NULL,\
	passwordhash varchar(255) NULL,\
	CONSTRAINT congregations_pkey PRIMARY KEY (id)\
);}