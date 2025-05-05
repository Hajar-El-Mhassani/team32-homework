-- Active: 1746434894922@@127.0.0.1@3307@mealSharing_schema
--Get all reviews
SELECT * FROM review;
--Add a new review
INSERT INTO review(title, description, meal_id, stars, create_date) VALUES
('Amazing meal', 'The meal was amazing!', 1, 5, '2023-01-01');
--Get a review with any id, fx 1
SELECT * FROM review WHERE id=1;
--Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE review SET title = 'Updated Review', description = 'Updated Description' WHERE id=1;
--Delete a review with any id, fx 1
DELETE FROM review WHERE id=1;