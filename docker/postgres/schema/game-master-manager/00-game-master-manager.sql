CREATE SEQUENCE public.game_master_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."game_master"
(
    id character varying DEFAULT nextval('public.game_master_id_seq'::regclass) NOT NULL,
    name character varying  NOT NULL,
    email character varying NOT NULL UNIQUE,
    password character varying NOT NULL,
    CONSTRAINT "PK_9a2f2f8f3b3e5d7d0d5c7d9c8b7" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."game_master"
    OWNER to postgres;
