-- Active: 1746434894922@@127.0.0.1@3307@mealSharing_schema

--Get all reservations
SELECT * FROM reservation;
--Add a new reservation
INSERT INTO reservation(number_of_guests, meal_id, create_date, contact_phonenumber, contact_name, contact_email) VALUES
(2, 1, '2023-01-01', '00456830752', 'John Doe', 'hajghfr@example.com');
--Get a reservation with any id, fx 1
SELECT * FROM reservation WHERE id=11;
--Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE reservation SET number_of_guests = 3, contact_name = 'Jane Doe' WHERE id=11;
--Delete a reservation with any id, fx 1
DELETE FROM reservation WHERE id=11;