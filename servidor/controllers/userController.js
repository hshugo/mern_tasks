const User = require('../models/User');
const bcriptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUsers = async (req, res) => {
    //Validate
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() });
    } 
    
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exists'});
        }
        //create the new user
        user= new User(req.body);

        //Hash the user
        const salt = await bcriptjs.genSalt(10);
        user.password= await bcriptjs.hash(password, salt);
        //save
        await user.save();

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
                res.json({ token }); // this tokens will be saves into local storage with axios
            });

        //message of confirmation
       // res.json({msg:'User created succesfully'});
    }catch(error) {
        console.log(error);
        res.status(400).send('There is one error');
    }
}