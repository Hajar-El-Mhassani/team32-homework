-- Active: 1746434894922@@127.0.0.1@3307@mealSharing_schema

SELECT * FROM meal;

INSERT INTO meal(title, description, location, `when`, max_reservation, price, created_date) VALUES
('Pizza', 'Description', 'Copenhagen', '2023-01-01', 3, 100, '2023-01-01'),
('Pasta', 'Description', 'Copenhagen', '2023-01-02', 4, 200, '2023-01-02'),
('Salad', 'Description', 'Copenhagen', '2023-01-03', 5, 300, '2023-01-03'),
('Sushi', 'Description', 'Copenhagen', '2023-01-04', 6, 400, '2023-01-04'),
('Burger', 'Description', 'Copenhagen', '2023-01-05', 7, 500, '2023-01-05');

--insert into reservation(number_of_guests, meal_id, create_date, contact_phonenumber, contact_name, contact_email) values

INSERT INTO reservation(number_of_guests, meal_id, create_date, contact_phonenumber, contact_name, contact_email) VALUES
(2, 1, '2023-01-01', '1234567890', 'John Doe', 'kW9lD@example.com'),
(3, 2, '2023-01-02', '0987654321', 'Jane Smith', 'I3f4b@example.com'),
(4, 3, '2023-01-03', '1122334455', 'Alice Johnson', 'CkH4t@example.com'),
(5, 4, '2023-01-04', '5566778899', 'Bob Brown', 'Ckt@example.com'),
(6, 5, '2023-01-05', '9988776655', 'Charlie Davis', 'Ck4t@example.com');

SELECT * FROM reservation;

-- Insert into review(title, description, meal_id, stars, create_date) values

INSERT INTO review(title, description, meal_id, stars, create_date) VALUES
('Great meal', 'The meal was fantastic!', 1, 5, '2023-01-01'),
('Not bad', 'The meal was okay.', 2, 3, '2023-01-02'),
('Delicious', 'I loved the meal!', 3, 4, '2023-01-03'),
('Average', 'The meal was average.', 4, 2, '2023-01-04'),
('Excellent', 'The meal was excellent!', 5, 5, '2023-01-05');

SELECT * FROM review;

--Get all meals
SELECT * FROM meal;
--Add a new meal
INSERT INTO meal(title, description, location, `when`, max_reservation, price, created_date) VALUES
('Tacos', 'Description', 'Copenhagen', '2023-01-06', 8, 600, '2023-01-06');
--Get a meal with any id, fx 1
SELECT * FROM meal WHERE id=1;
--Update a meal with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE meal SET title = 'Updated Pizza', description = 'Updated Description' WHERE id=1;
--Delete a meal with any id, fx 1
DELETE FROM meal WHERE id=5;