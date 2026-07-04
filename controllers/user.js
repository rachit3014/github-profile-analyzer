const db = require('../config/sql');
const axios = require('axios');
const usertable = require('../models/user');

/**
 * Fetches a GitHub user's profile and stores it in the MySQL database.
 */
module.exports.userdata = async function (req, res) {
    // Get GitHub username from query parameters
    
    const username = req.query.username;
    console.log('username', username);
    try {
    
        const reposonse = await axios.get(
  `https://api.github.com/users/${username}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  }
);
// console.log('response from github api', reposonse);

        const data = reposonse.data;
        
        // Create users table if it does not exist
        usertable();
        
          // Insert or update GitHub user profile in MySQL
        db.query(
            ` INSERT INTO  users
            (username,name,followers,following,public_repos,avatar_url,profile_url) 
            VALUES
            (?,?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            followers = VALUES(followers),
            following = VALUES(following),
            public_repos = VALUES(public_repos),
            avatar_url = VALUES(avatar_url),
            profile_url = VALUES(profile_url)`,
            [
                data.login,
                data.name,
                data.followers,
                data.following,
                data.public_repos,
                data.avatar_url,
                data.html_url
            ],
            (error, result) => {
                if (error) {
                    console.log('error in inserting data into database', error);
                }
                else {
                    console.log('data inserted sucessfully into database');
                }


            }
        )
        
        // Prepare response object
        const userData = {
        username: data.login,
        name: data.name,
        followers: data.followers,
        following: data.following,
        public_repos: data.public_repos,
        avatar_url: data.avatar_url,
        profile_url: data.html_url
    };

        return res.status(200).json({
            userData,
            message: 'user found successfully'
        })

    } catch (error) {
        console.log('error in fetching data from github api', error);
        return res.status(500).json({
            message: 'internal server error'
        })

    }

}

/**
 * Retrieves all stored GitHub user profiles.
 */
module.exports.alluserprofile = async function (req, res) {
    // Fetch all user profiles from the database
    db.query(
        `SELECT * FROM users`,
        (error, result) => {
            if (error) {
                console.log('error in getting the data from database', error);
                return res.status(500).json({
                    message: 'internal server error'
                });
            }
            else {
                return res.status(200).json({
                    data: result,
                    message: 'user profile data fetched successfully'
                })
            }
        }
    )
}


/**
 * Retrieves a single GitHub user profile using username.
 */
module.exports.singleprofile = async function (req, res) {
    // Read username from query parameter
    const user = req.query.username;
    
    // Fetch a specific user profile
    db.query(
        `
        SELECT * FROM users WHERE username = ?`,
        [user],
        (error, result) => {
            if (error) {
                console.log('error in getting the data from database', error);
                return res.status(500).json({
                    message: 'internal server error'
                });
            }
            else {
                return res.status(200).json({
                    data: result,
                    message: 'user profile data fetched successfully'
                })
            }
        }
    )
}

/**
 * Deletes a GitHub user profile from the database.
 * Associated repositories are automatically removed
 * through ON DELETE CASCADE.
 */

module.exports.deleteprofile = async function (req, res) {
    
    // Read username from query parameter
    const user = req.query.username;
    if(!user)
    {
        return res.status(400).json({
            message: 'username is required'
        })
    }

    // Delete user profile from the database
    db.query(
        `
        DELETE FROM users WHERE username = ?`,
        [user],
        (error, result) => {
            if (error) {
                console.log('error in deleting the data from database', error);
                return res.status(500).json({
                    message: 'internal server error'
                });
            }
            else {
                return res.status(200).json({
                    message: 'user profile deleted successfully'
                })
            }
        }
    )

}


