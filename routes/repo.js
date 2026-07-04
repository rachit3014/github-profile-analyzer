const express = require('express');
const router = express.Router();
const repocontroller = require('../controllers/repo.js')

/**
 * Repository-related API routes
 */
// Fetch and store GitHub repositories for a user
router.post('/', repocontroller.saverepositories)

// Retrieve all stored repositories of a specific user
router.get('/allrepo', repocontroller.allrepositories)
module.exports = router;
