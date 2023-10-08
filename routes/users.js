
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controllers');
/* GET users listing. */ 
router.get('/',  usersController.listUsers);
router.get('/:id',  usersController.getUserById);
router.post('/',  usersController.createUser);

module.exports = router;
