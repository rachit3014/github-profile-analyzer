const express = require('express');
const router = express.Router();
const repocontroller = require('../controllers/repo.js')

router.post('/', repocontroller.saverepositories)
router.get('/allrepo', repocontroller.allrepositories)
module.exports = router;