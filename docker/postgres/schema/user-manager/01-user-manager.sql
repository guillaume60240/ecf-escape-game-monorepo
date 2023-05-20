ALTER TABLE public."user" 
ALTER COLUMN id  TYPE integer USING (id::integer);