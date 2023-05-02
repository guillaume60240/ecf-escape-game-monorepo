ALTER TABLE public."booking" DROP COLUMN IF EXISTS "start_date";
ALTER TABLE public."booking" ADD COLUMN start_date timestamp without time zone NOT NULL;
ALTER TABLE public."booking" ADD CONSTRAINT unique_dta_slot UNIQUE(start_date, time_slot);