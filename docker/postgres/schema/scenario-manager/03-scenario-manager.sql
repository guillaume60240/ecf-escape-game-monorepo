ALTER TABLE IF EXISTS public."scenario"
    ADD COLUMN "summary" character varying NOT NULL;

DROP TABLE IF EXISTS public."room";