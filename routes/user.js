const express = require('express');
const router= express.Router();
const usercontroller = require('../controllers/user.js')

/**
 * User-related API routes
 */

// Analyze and store GitHub user profile
router.post('/', usercontroller.userdata)

// Retrieve all stored user profiles
router.get('/alluserprofile', usercontroller.alluserprofile)

// Retrieve a specific user profile
router.get('/userprofile', usercontroller.singleprofile)

// Delete a user profile and associated repositories
router.delete('/deleteuser', usercontroller.deleteprofile)


module.exports= router;
