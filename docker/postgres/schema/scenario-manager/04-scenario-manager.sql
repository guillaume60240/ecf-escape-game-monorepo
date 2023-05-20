ALTER TABLE public."scenario" 
ALTER COLUMN id  TYPE integer USING (id::integer);