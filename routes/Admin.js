var express = require('express');
var router = express.Router();
const adminController=require('../controllers/adminControlller')
const authAdmin=require('../middlewares/authMiddleware')

/* GET home page. */

router.post('/',adminController.registerAdmin)

router.post('/login',adminController.authAdmin)

router.get('/allUsers',adminController.getUsers)

router.post('/addUsers',adminController.addUser)

router.get('/:id',adminController.getSingleUser)

router.put('/:id',adminController.editUser)

router.delete('/:id',adminController.deleteUser)

module.exports = router;
