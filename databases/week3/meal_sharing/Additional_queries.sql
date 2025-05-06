-- Active: 1746434894922@@127.0.0.1@3307@mealSharing_schema

--Get meals that has a price smaller than a specific price fx 90
SELECT * FROM meal WHERE price < 300;

--Get meals that still has available reservations
SELECT * FROM meal WHERE max_reservation > (SELECT COUNT(*) FROM reservation WHERE meal_id = meal.id);
--Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
SELECT * FROM meal WHERE title LIKE 'RØd grød%';
--Get meals that has been created between two dates
SELECT * FROM meal WHERE created_date BETWEEN '2023-01-01' AND '2023-01-03';
--Get only specific number of meals fx return only 5 meals
SELECT * FROM meal LIMIT 5;
--Get the meals that have good reviews
SELECT * FROM meal WHERE id IN (SELECT meal_id FROM review WHERE stars >= 4);
--Get reservations for a specific meal sorted by created_date
SELECT * FROM reservation WHERE meal_id = 3 ORDER BY create_date DESC;
--Sort all meals by average number of stars in the reviews
SELECT * FROM meal ORDER BY (SELECT AVG(stars) FROM review WHERE meal_id = meal.id) DESC;