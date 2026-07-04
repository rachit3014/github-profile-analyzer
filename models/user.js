const db = require('../config/sql');
const Usertable= ()=> {
    db.query(
    `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    avatar_url TEXT,
    profile_url TEXT
    )`,
    (err, result) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created or already exists');
        }
    }
);
}

module.exports= Usertable;