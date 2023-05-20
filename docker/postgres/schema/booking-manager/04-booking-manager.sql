ALTER TABLE public."booking" 
ALTER COLUMN id  TYPE integer USING (id::integer);