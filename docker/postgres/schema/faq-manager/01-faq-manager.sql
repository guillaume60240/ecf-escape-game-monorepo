ALTER TABLE public."faq" 
ALTER COLUMN id  TYPE integer USING (id::integer);