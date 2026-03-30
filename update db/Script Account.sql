{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 -- public.accounts definition\
\
-- Drop table\
\
-- DROP TABLE public.accounts;\
\
CREATE TABLE public.accounts (\
	id varchar(255) NOT NULL,\
	"name" varchar(255) NOT NULL,\
	email varchar(255) NOT NULL,\
	"role" varchar(32) DEFAULT 'jemaat'::character varying NOT NULL,\
	CONSTRAINT accounts_email_key UNIQUE (email),\
	CONSTRAINT accounts_pkey PRIMARY KEY (id),\
	CONSTRAINT accounts_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'jemaat'::character varying])::text[])))\
);}