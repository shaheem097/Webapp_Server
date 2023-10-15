var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController')
const userAuth=require('../middlewares/authMiddleware')


/* GET users listing. */


 router.post('/register',userController.registerUser)

 router.post('/login',userController.PostloginUser)

 router.get('/profile',userController.getProfileData)

 router.post('/profile/:id',userAuth.protect, userController.updateUserProfile)

module.exports = router;
