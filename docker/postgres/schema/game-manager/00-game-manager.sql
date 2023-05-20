CREATE SEQUENCE public.game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."game"
(
    id integer DEFAULT nextval('public.game_id_seq'::regclass) NOT NULL,
    started_at timestamp without time zone NOT NULL,
    ended_at timestamp without time zone NULL,
    duration integer NULL,
    status character varying NOT NULL DEFAULT 'started'::character varying,
    booking_id integer NOT NULL,
    scenario_id integer NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a9e9" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."game"
    OWNER to postgres;