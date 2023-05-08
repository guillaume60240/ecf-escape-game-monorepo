ALTER TABLE public."booking" 
ALTER COLUMN scenario_id  TYPE integer USING (scenario_id::integer);