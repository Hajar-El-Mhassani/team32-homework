-- Active: 1746528944152@@127.0.0.1@3307@social_media
CREATE DATABASE social_media
    DEFAULT CHARACTER SET = 'utf8mb4';
USE social_media;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)  NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_datetime DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Posts table
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    content TEXT NOT NULL,
    created_date  ⁠DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    updated_date  ⁠DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comments table
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_date  ⁠DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    updated_date  ⁠DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    parent_comment_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id)
);

-- Reaction types (like, laugh, cry, etc.)
CREATE TABLE reaction_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Reactions (to posts or comments)
CREATE TABLE reactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_id INT NOT NULL,
    user_id INT NOT NULL,
    post_id INT,
    comment_id INT,
    created_date DATETIME NOT NULL,
    FOREIGN KEY (type_id) REFERENCES reaction_types(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    -- Constraints to prevent duplicate reactions
    UNIQUE (user_id, post_id, type_id),
    UNIQUE (user_id, comment_id, type_id)
);

-- Friendships (symmetric: user1 < user2 to avoid duplication)
CREATE TABLE friendships (
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);
