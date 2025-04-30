-- Active: 1744803590139@@127.0.0.1@3307@hyf_lessons1

--1. Add a task with these attributes: title, description, created, updated, due_date, status_id, user_id
 INSERT INTO task (title, description, created, updated, due_date, status_id, user_id) VALUES
 ('Task 1', 'Description for task 1', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP , 1, 1),
 ('Task 2', 'Description for task 2', '2023-10-02 20:14:00', '2023-10-02 20:17:00', '2023-10-16 20:14:00', 2, 2),
 ('Task 3', 'Description for task 3', '2023-10-03 16:14:00', '2023-10-03 19:17:00', '2023-10-17 20:14:00', 1, 1);
 SELECT * FROM task;
--2. Change the title of a task
 UPDATE task SET title='Updated Task 1' WHERE title='Task 1';  
--3. Change a task due date
UPDATE task SET due_date= CURRENT_TIMESTAMP WHERE id = 40;
--4. Change a task status
UPDATE task SET status_id=(SELECT id FROM status WHERE name='In Progress') WHERE id=37;
--4. Mark a task as complete
UPDATE task SET status_id=(SELECT id FROM status WHERE name='Done') WHERE id=37;
--4. Delete a task