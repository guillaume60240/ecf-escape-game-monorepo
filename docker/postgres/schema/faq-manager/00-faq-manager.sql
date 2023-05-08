CREATE SEQUENCE public.faq_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."faq"
(
    id character varying DEFAULT nextval('public.faq_id_seq'::regclass) NOT NULL,
    question character varying NOT NULL,
    answer character varying NOT NULL,
    CONSTRAINT "PK_9c9e9a9a9c9e9a9a9c9e9a9a912" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."faq"
    OWNER to postgres;