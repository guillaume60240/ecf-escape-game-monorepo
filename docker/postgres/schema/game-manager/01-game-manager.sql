ALTER TABLE IF EXISTS public."game"
    ADD COLUMN IF NOT EXISTS "booking_id" varchar NOT NULL;
ALTER TABLE IF EXISTS public."game"
    ADD COLUMN IF NOT EXISTS "scenario_id" varchar NOT NULL;