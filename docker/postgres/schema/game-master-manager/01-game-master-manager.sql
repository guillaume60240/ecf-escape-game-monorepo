ALTER TABLE public."game_master" 
ALTER COLUMN id  TYPE integer USING (id::integer);