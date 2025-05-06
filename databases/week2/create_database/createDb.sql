-- Active: 1746434894922@@127.0.0.1@3307@continuing_education_schema


CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    date_of_birth DATE,
    enrollment_date DATE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    office_location VARCHAR(100)
) ENGINE=InnoDB;

CREATE TABLE course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    credit_hours INT NOT NULL,
    prerequisites VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE session (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location VARCHAR(255),
    capacity INT,
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
) ENGINE=InnoDB;

CREATE TABLE enrollment (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    session_id INT NOT NULL,
    enrollment_date DATE NOT NULL ,
    status ENUM('enrolled','waitlist','dropped','completed') NOT NULL DEFAULT 'enrolled',
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (session_id) REFERENCES session(session_id)
) ENGINE=InnoDB;

CREATE TABLE program (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
) ENGINE=InnoDB;

CREATE TABLE program_courses (
    program_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (program_id, course_id),
    FOREIGN KEY (program_id) REFERENCES program(program_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
) ENGINE=InnoDB;

CREATE TABLE program_enrollment (
    program_enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    program_id INT NOT NULL,
    enrollment_date DATE NOT NULL ,
    status ENUM('active','completed','withdrawn') NOT NULL DEFAULT 'active',
    progress_pct DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (program_id) REFERENCES program(program_id)
) ENGINE=InnoDB;


CREATE TABLE certification (
    certification_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    program_id INT NOT NULL,
    issue_date DATE NOT NULL,
    expiration_date DATE,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (program_id) REFERENCES program(program_id)
) ENGINE=InnoDB;

CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM('pending','completed','failed') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (enrollment_id) REFERENCES enrollment(enrollment_id)
) ENGINE=InnoDB;
