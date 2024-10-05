const jwt = require('jsonwebtoken');

const JWL_SECRET = process.env.JWL_SECRET_KEY;

const verifyToken = (req , res , next) => {
    try{
        //const token = req.cookies.token;
        const token = req.headers.authorization?.split(' ')[1];
       if(!token) {
        return res.status(401).send({message:"No token provided"})
       }
       const decode = jwt.verify(token,JWL_SECRET);
       if(!decode.userId){
        return res.status(401).send({message:"Invalid token provided"})
       }

       req.userId = decode.userId;
       req.role = decode.role;
       next();

    }catch(error){
        console.error("Error verify token",error);
        res.status(401).send({message:"Invalid token"})
    }
}

module.exports = verifyToken

