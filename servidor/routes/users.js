//Routes for create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');
//Create user
//post to api/users
router.post('/', 
    [check('name', 'The name is required').not().isEmpty(),
     check('email', 'The email is required').isEmail(),
     check('password', 'The password would be almost of 6 characters').isLength({min: 6})
    ],
    userController.createUsers
    );

module.exports = router;