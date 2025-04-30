-- Active: 1744803590139@@127.0.0.1@3307@hyf_lessons2
SELECT * FROM status ;
SELECT * FROM task;
SELECT * FROM user;
SELECT * FROM user_task

--Get all the tasks assigned to users whose email ends in @spotify.com
SELECT t.title, u.email FROM task t
JOIN user_task u_t  ON t.id = u_t.task_id
JOIN user u ON u.id = u_t.user_id
WHERE u.email LIKE '%@spotify.com';

--Get all the tasks for 'Donald Duck' with status 'Not started'
SELECT title, u.name,  s.name FROM task t 
JOIN status s ON t.status_id = s.id
JOIN user_task u_t  ON t.id = u_t.task_id
JOIN user u ON u.id = u_t.user_id
WHERE u.name = 'Donald Duck' AND s.name = 'Not started';

--Get all the tasks for 'Maryrose Meadows' that were created in september (hint: month(created)=month_number)
SELECT t.title, u.name, MONTH(t.created) as month_number FROM task t
JOIN user_task u_t  ON t.id = u_t.task_id
JOIN user u ON u.id = u_t.user_id
WHERE u.name = 'Maryrose Meadows' AND MONTH(t.created) = 9;
--Find how many tasks where created in each month, e.g. how many tasks were created in october, how many tasks were created in november, etc. (hint: use group by)
SELECT MONTH(t.created) as month_number, COUNT(*) as task_count FROM task t
JOIN user_task u_t  ON t.id = u_t.task_id
JOIN user u ON u.id = u_t.user_id
GROUP BY MONTH(t.created);