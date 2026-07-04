 const axios = require("axios");
 const db = require("../config/sql");
 const repotable = require("../models/repo");

/**
 * Fetches all repositories of a GitHub user,
 * stores them in MySQL, and saves the programming languages.
 */
module.exports.saverepositories = async function (req, res) {
    try {
        // Get GitHub username from query parameters
        const username = req.query.username;
        if (!username) {
            return res.status(400).json({
                message: "please enter username "
            })
        }
     
       // Fetch all public repositories from GitHub

        const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
            headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            
            Accept: "application/vnd.github+json",
            },
        }
        );


        // Fetch languages used in each repository
        const responses = await Promise.all(response.data.map(async (repo) => {
            const languageRepo = await axios.get(repo.languages_url, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    
                    Accept: "application/vnd.github+json",
                },
            });
            const languages = languageRepo.data;
            
            return {
                repo_name: repo.name,
                primary_language: repo.language,
                languages: JSON.stringify(Object.keys(languages))
            }

        }))
     
        // Create repositories table if it does not exist
        repotable();
        
        db.query(
            "SELECT id FROM users WHERE username = ?",
                [username],
                (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found in database"
            });
        }

        const userId = result[0].id;

        responses.forEach((repo) => {
           console.log(repo);

            db.query(
                `INSERT INTO repos
                (user_id, repo_name, primary_language, languages)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                repo_name = VALUES(repo_name),
                primary_language = VALUES(primary_language),
                languages = VALUES(languages)`,
                [
                    userId,
                    repo.repo_name,
                    repo.primary_language,
                    repo.languages
                ],
                (err) => {
                    if (err) {
                        console.log("Repo insert error:", err);
                    }
                }
            );

        });


        return res.status(200).json({

            responses,

            message: 'repositories found successfully'
        })
    }
    )
    }
    catch (error) {
        console.log('error in fetching data from github api', error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}   

/**
 * Retrieves all stored repositories of a specific GitHub user.
 */
module.exports.allrepositories = async function (req, res) {

    // Read username from query parameter

    const username = req.query.username;

    if (!username) {
        return res.status(400).json({
            message: "Username is required"
        });
    }
  // Fetch repositories using INNER JOIN between users and repos table
    db.query(
        `SELECT
            r.id,
            r.repo_name,
            r.primary_language,
            r.languages
        FROM users u
        INNER JOIN repos r
        ON u.id = r.user_id
        WHERE u.username = ?`,
        [username],
        (error, result) => {

            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "No repositories found for this user"
                });
            }

            return res.status(200).json({
                data: result,
                message: "Repositories fetched successfully"
            });
        }
    );
};

