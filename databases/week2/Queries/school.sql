-- Active: 1744803590139@@127.0.0.1@3307@hyf_lessons1

--Create a new database containing the following tables:
--Class: with the columns: id, name, begins (date), ends (date)
CREATE TABLE Class(
    id INT ,
    name VARCHAR(255) NOT NULL,
    begins DATE NOT NULL,
    ends DATE NOT NULL,
    CONSTRAINT class_pk PRIMARY KEY (id),
    CONSTRAINT class_name_unique UNIQUE (name)
);
--Student: with the columns: id, name, email, phone, class_id (foreign key)
CREATE TABLE Student(
    id INT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    class_id INT NOT NULL,
    CONSTRAINT student_pk PRIMARY KEY (id),
    CONSTRAINT student_class_fk FOREIGN KEY (class_id) REFERENCES Class(id)
);

--insert some data into the tables
INSERT INTO Class (id, name, begins, ends) VALUES
(1, 'Math', '2023-10-01', '2024-06-01'),
(2, 'Science', '2023-10-01', '2024-06-01'),
(3, 'History', '2023-10-01', '2024-06-01');

INSERT INTO Student (id, name, email, phone, class_id) VALUES
(1, 'John Doe', 'gBhM1@example.com', '12345678', 1),
(2, 'Jane Doe', 'kM2G1@example.com', '98765432', 1),
(3, 'Bob Smith', 'qNw5o@example.com', '5555555', 3);

--Create an index on the name column of the student table.
CREATE INDEX idx_student_name ON Student(name);

--Add a new column to the class table named status which can only have the following values: not-started, ongoing, finished (hint: enumerations).
ALTER TABLE Class ADD COLUMN Status ENUM( 'not-started', 'ongoing', 'finished' ) DEFAULT 'not-started';