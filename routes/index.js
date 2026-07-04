const express = require('express');

const router = express.Router();

router.use('/user',require('../routes/user'));
router.use('/repo',require('../routes/repo'));




module.exports = router; 
