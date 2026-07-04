const express = require('express');
const router= express.Router();
const usercontroller = require('../controllers/user.js')

router.post('/', usercontroller.userdata)

router.get('/alluserprofile', usercontroller.alluserprofile)

router.get('/userprofile', usercontroller.singleprofile)

router.delete('/deleteuser', usercontroller.deleteprofile)


module.exports= router;