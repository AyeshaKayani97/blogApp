const User = require("../models/User")
const jwt = require("jsonwebtoken")
const authenticate = async (req, res, next)=>{

    try{
        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token, process.env.SECRETE_KEY)
        const rootUser = User.findOne({_id:verifyToken._id, "tokens:token":token}) 
        if(!rootUser){
            throw new Error("user not found")
            req.token = token
            req.rootUser = rootUser
            req.rootUserId = rootUser._id
            next()


        } else{

        }



    }catch(e){
        res.status(401).send("Unauthorized, no token found")
        console.log(e)
    }
}

module.exports = authenticate