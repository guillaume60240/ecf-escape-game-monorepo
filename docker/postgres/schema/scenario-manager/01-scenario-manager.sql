ALTER TABLE IF EXISTS public."scenario"
    DROP COLUMN IF EXISTS "price_id";
ALTER TABLE IF EXISTS public."scenario"
    DROP COLUMN IF EXISTS "room_id";

ALTER TABLE IF EXISTS public."price"
    DROP COLUMN IF EXISTS "range";
ALTER TABLE IF EXISTS public."price"
    ADD COLUMN "min_players" integer NOT NULL;
ALTER TABLE IF EXISTS public."price"
    ADD COLUMN "max_players" integer NOT NULL;
ALTER TABLE IF EXISTS public."price"
    ADD COLUMN "price" integer NOT NULL;