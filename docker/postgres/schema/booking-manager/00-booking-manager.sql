CREATE SEQUENCE public.booking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."booking"
(
    id character varying DEFAULT nextval('public.booking_id_seq'::regclass) NOT NULL,
    start_date timestamp without time zone NOT NULL UNIQUE,
    time_slot character varying NOT NULL,
    user_id integer NOT NULL,
    scenario_id character varying NOT NULL,
    players integer NOT NULL,
    price integer NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a910" PRIMARY KEY (id)
);

CREATE SEQUENCE public.time_slot_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."time_slot"
(
    id character varying DEFAULT nextval('public.time_slot_seq'::regclass) NOT NULL,
    display_hour character varying NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a911" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."booking"
    OWNER to postgres;

ALTER TABLE IF EXISTS public."time_slot"
    OWNER to postgres;

INSERT INTO "public"."time_slot"("display_hour")
VALUES

(
    '10:00'
),
(
    '11:00'
),
(
    '13:00'
),
(
    '14:00'
),
(
    '15:00'
),
(
    '16:00'
),
(
    '17:00'
),
(
    '18:00'
),
(
    '19:00'
),
(
    '20:00'
),
(
    '21:00'
);