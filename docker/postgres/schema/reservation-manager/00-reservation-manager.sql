CREATE SEQUENCE public.reservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."reservation"
(
    id character varying DEFAULT nextval('public.reservation_id_seq'::regclass) NOT NULL,
    date_start timestamp without time zone NOT NULL,
    user_id character varying NOT NULL,
    scenario_id character varying NOT NULL,
    players integer NOT NULL,
    price integer NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a9d9" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."reservation"
    OWNER to postgres;