const jwt = require('jsonwebtoken');
module.exports = function (req,res, next){
    //Read token of header
    const token= req.header('x-auth-token');
    console.log(token);
    //Check if there is not token
    if(!token) {return res.status(401).json({mge: "not exist token, not valid access"})}
    //Validate the token
    try {
        //this method verify the token
        const cifrate   = jwt.verify(token, process.env.SECRET);
        req.user = cifrate.user;
        next(); // got to the next middleware
    } catch (error) {
        res.status('401').json({msg: "Token invalid"});
    }
}   