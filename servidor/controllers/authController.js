const User = require('../models/User');
const bcriptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    //Validate
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() });
    } 
    
    const {email, password} = req.body;
    try {
        //see if it is one user register
        console.log("recibe",email);
        let user = await User.findOne({email});
        console.log("NO ENCONTRO:", user);
        if(!user){
            return res.status(400).json({msg:'The User not exists'});
        }
        //compare password
        const passCorrect = await bcriptjs.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json({msg: "password incorrect"});
        } 

        //If all is correct create the jwt
        //create and sign
        const payload = {
            user: {
                id: user.id
            }
        }
        //Sign the token
        jwt.sign(payload,process.env.SECRET,
            {
                expiresIn: 3600 //1 hora
            }, (error, token) => {
                if(error) throw error;
                console.log(token);
                res.send({ token });
            });

        //res.json({msg:'Access successfull to User .. '});
    }catch(error) {
        console.log(error);
        res.status(400).send('There is one error');
    }
}

//get the user authenticated
exports.authenticatedUser = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //the password doesnt want
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There is one error'});
    }
}