-- Active: 1746528944152@@127.0.0.1@3307@social_media

CREATE TABLE IF NOT EXISTS users (
    id INT  AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_datetime DATETIME NOT NULL,
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



-- Posts table
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    content TEXT NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comments table
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
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
