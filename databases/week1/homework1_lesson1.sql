-- Active: 1744803590139@@127.0.0.1@3307@hyf_lessons1


--1. Find out how many tasks are in the task table
select count(*) as count from task;

-- Find out how many tasks in the task table do not have a valid due date

select count(*) as count from task where due_date is null;

-- 3. Find all the tasks that are marked as done
select * from task WHERE status_id = 3;

-- 4. Find all the tasks that are not marked as done
select * from task WHERE status_id != 3;

-- 5. Get all the tasks, sorted with the most recently created first
select * from task ORDER BY created_at DESC;

-- 6. Get the single most recently created task
select * from task ORDER BY created_at DESC LIMIT 1;
-- 7. Get the title and due date of all tasks where the title or description contains database
SELECT title, due_date
FROM task
WHERE title LIKE '%database%'
   OR description LIKE '%database%';

-- 8. Get the title and status (as text) of all tasks

SELECT t.title,
       s.name AS status
FROM task t
JOIN status s
  ON t.status_id = s.id;


-- 9. Get the name of each status, along with a count of how many tasks have that status
SELECT s.name,
       COUNT(t.id) AS task_count
FROM status s
LEFT JOIN task t
  ON s.id = t.status_id
GROUP BY s.name;

-- Get the names of all statuses, sorted by the status with most tasks first

SELECT s.name
FROM status s
LEFT JOIN task t
  ON s.id = t.status_id
GROUP BY s.name
ORDER BY COUNT(t.id) DESC;
