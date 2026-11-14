# FloDow


Database creation queries:

For creating kanban table:

CREATE TABLE kanban (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);