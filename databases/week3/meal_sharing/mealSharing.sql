-- Active: 1746528944152@@127.0.0.1@3307@mealSharing_schema
 

 --Create Meal table

 CREATE TABLE meal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    location varchar(255) NOT NULL,
    `when` DATETIME NOT NULL,
    max_reservation INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
 );

 --create reservation table 

 CREATE TABLE reservation(
 id INT NOT NULL AUTO_INCREMENT,
 number_of_guests INT NOT NULL,
 meal_id INT NOT NULL,
 create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
 contact_phonenumber varchar(255) NOT NULL,
 contact_name VARCHAR(255) NOT NULL,
 contact_email VARCHAR(255) NOT NULL,
 CONSTRAINT PK_meal_id PRIMARY KEY (id),
 CONSTRAINT UQ_contact_email UNIQUE (contact_email),
 CONSTRAINT UQ_contact_phonenumber UNIQUE (contact_phonenumber),
 CONSTRAINT FK_meal_id FOREIGN KEY (meal_id) REFERENCES meal(id) ON DELETE CASCADE

 );

 -- Create table Review
 CREATE TABLE review(
    id INT AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    meal_id INT NOT NULL,
    stars INT NOT NULL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_review_id PRIMARY KEY (id),
    CONSTRAINT FK_mealid FOREIGN KEY (meal_id) REFERENCES meal(id) ON DELETE CASCADE
 );