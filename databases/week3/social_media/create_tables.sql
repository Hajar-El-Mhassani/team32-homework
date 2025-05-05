-- Active: 1746434894922@@127.0.0.1@3307@mealSharing_schema
--user table

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_users PRIMARY KEY (id),
    CONSTRAINT UQ_users UNIQUE (email, name)

);
-- posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT,
    title text NOT NULL,
    content TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    CONSTRAINT PK_posts PRIMARY KEY (id),
    CONSTRAINT FK_posts_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 -- comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_comment_id INT DEFAULT NULL,
    CONSTRAINT PK_comments PRIMARY KEY (id),
    CONSTRAINT FK_comments_posts FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT FK_comments_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_comments_parent_comment FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE

) ENGINE=InnoDB;

--reactions table
CREATE TABLE IF NOT EXISTS reactions (
    id INT AUTO_INCREMENT,
    type ENUM('like', 'highfive','laugh', 'cry', 'angry') NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_id INT DEFAULT NULL,
    CONSTRAINT PK_reactions PRIMARY KEY (id),
    CONSTRAINT FK_reactions_posts FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT FK_reactions_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_reactions_comments FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
)ENGINE=InnoDB;

