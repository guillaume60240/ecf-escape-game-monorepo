INSERT INTO "public"."room"("name")
VALUES
    ('Salle 1'),
    ('Salle 2'),
    ('Salle 3'),
    ('Salle 4'),
    ('Salle 5'),
    ('Salle 6');

INSERT INTO "public"."price"("min_players", "max_players", "price")
VALUES
    (
        
        1,
        3,
        27
    ),
    (
        
        4,
        6,
        22
    ),
    (
        
        7,
        8,
        20
    );
    
INSERT INTO "public"."scenario"("name", "description", "difficulty", "min_players", "max_players", "duration", "pictures")
VALUES(
    'Le mystère de la chambre jaune',
    'Vous êtes un groupe de détectives privés. Vous avez été engagé par un riche industriel pour résoudre le mystère de la chambre jaune. Vous avez 60 minutes pour découvrir le secret de la chambre jaune et vous échapper avant que le propriétaire ne revienne.',
    2,
    1,
    7,
    45,
    ARRAY ['jaune-1.jpg', 'jaune-2.jpg', 'jaune-3.jpg']
),
(
    'Le mystère de la chambre rouge',
    'Vous êtes un groupe de détectives privés. Vous avez été engagé par un riche industriel pour résoudre le mystère de la chambre rouge. Vous avez 60 minutes pour découvrir le secret de la chambre rouge et vous échapper avant que le propriétaire ne revienne.',
    3,
    1,
    8,
    60,
    ARRAY ['rouge-1.jpg', 'rouge-2.jpg', 'rouge-3.jpg']
);