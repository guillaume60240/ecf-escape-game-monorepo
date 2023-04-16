CREATE SEQUENCE public.scenario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."scenario"
(
    id character varying DEFAULT nextval('public.scenario_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    difficulty integer NOT NULL,
    room_id character varying NOT NULL,
    price_id character varying NOT NULL,
    min_players integer NOT NULL,
    max_players integer NOT NULL,
    duration time NOT NULL,
    pictures character varying NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a9f9" PRIMARY KEY (id)
);

CREATE SEQUENCE public.room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."room"
(
    id character varying DEFAULT nextval('public.room_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a9g9" PRIMARY KEY (id)
);

CREATE SEQUENCE public.price_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."price"
(
    id character varying DEFAULT nextval('public.price_id_seq'::regclass) NOT NULL,
    range json NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a9h9" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."scenario"
    OWNER to postgres;

ALTER TABLE IF EXISTS public."room"
    OWNER to postgres;

ALTER TABLE IF EXISTS public."price"
    OWNER to postgres;  