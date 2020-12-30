//Routes for auth
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
//Init session
//post to api/auth
router.post('/', 
    /*
    [
     check('email', 'The email is required').isEmail(),
     check('password', 'The password would be almost of 6 characters').isLength({min: 6})
    ],*/
    authController.authenticateUser
);
//Get the user authenticated
router.get('/', 
    auth,
    authController.authenticatedUser
);
module.exports = router;