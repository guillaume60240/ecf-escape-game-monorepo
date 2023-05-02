-- SCHEMA: public

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."user"
(
    id character varying DEFAULT nextval('public.user_id_seq'::regclass) NOT NULL,
    name character varying  NOT NULL,
    email character varying NOT NULL UNIQUE,
    password character varying NOT NULL,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;