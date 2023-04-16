INSERT INTO "public"."room"("name")
VALUES
    ('Salle 1'),
    ('Salle 2'),
    ('Salle 3'),
    ('Salle 4'),
    ('Salle 5'),
    ('Salle 6');

INSERT INTO "public"."price"("range")
VALUES
    (
        
        '{
            "1":{"min_players": 1, "max_players": 3, "price_by_player": 25},
            "2":{"min_players": 4, "max_players": 6, "price_by_player": 20},
            "3":{"min_players": 7, "max_players": 7, "price_by_player": 18}
        }' 
    ),
    (
        '{

            "1":{"min_players": 1, "max_players": 3, "price_by_player": 27},
            "2":{"min_players": 4, "max_players": 6, "price_by_player": 22},
            "3":{"min_players": 7, "max_players": 8, "price_by_player": 20}
        }'
    );

INSERT INTO "public"."scenario"("name", "description", "difficulty", "room_id", "price_id", "min_players", "max_players", "duration", "pictures")
VALUES(
    'Le mystère de la chambre jaune',
    'Vous êtes un groupe de détectives privés. Vous avez été engagé par un riche industriel pour résoudre le mystère de la chambre jaune. Vous avez 60 minutes pour découvrir le secret de la chambre jaune et vous échapper avant que le propriétaire ne revienne.',
    2,
    ARRAY ['1', '2', '3'],
    '1',
    1,
    7,
    '01:00:00',
    ARRAY ['jaune-1.jpg', 'jaune-2.jpg', 'jaune-3.jpg']
),
(
    'Le mystère de la chambre rouge',
    'Vous êtes un groupe de détectives privés. Vous avez été engagé par un riche industriel pour résoudre le mystère de la chambre rouge. Vous avez 60 minutes pour découvrir le secret de la chambre rouge et vous échapper avant que le propriétaire ne revienne.',
    3,
    ARRAY ['4', '5', '6'],
    '2',
    1,
    8,
    '01:00:00',
    ARRAY ['rouge-1.jpg', 'rouge-2.jpg', 'rouge-3.jpg']
);