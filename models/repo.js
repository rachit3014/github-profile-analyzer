const db= require('../config/sql');

/**
 * Creates the repositories table if it does not already exist.
 * Each repository is linked to a user through a foreign key.
 */
const repotable =()=>{
    
     // Create repositories table
    db.query(
        `CREATE TABLE IF NOT EXISTS repos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            repo_name VARCHAR(255),
            primary_language VARCHAR(255),
            languages JSON,
            FOREIGN KEY (user_id) REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        )`,
        (err, result) => {
            if (err) {
                console.error('Error creating repos table:', err);
            } else {
                console.log('Repos table created or already exists');
               }   
        }
    )
}
module.exports = repotable;
