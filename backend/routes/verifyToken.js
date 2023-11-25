const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token
    // console.log(authHeader)
    if(authHeader){
        // get token from the header  and split it get the token only
        const token = authHeader.split(" ")[1];
        console.log(token, "token")
        if (!token) {
            return res.status(401).json("Token not found in the header");}
        else{

            jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
                console.log(user)
                if(err){
                    res.status(403).json("Token is not valid")
                } 
                else {
                    console.log(user); // Log the user for debugging
                    req.user = user;
                    next();
                }
               
            })
        }


    }else{
        res.status().json("You are authenticated")
    }

}
const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin ) {
            next()

        }else{
            res.status(400).json("you are not allowed to do that")
        }
    })
}
const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin ) {
            next()

        }else{
            res.status(400).json("you are not allowed to do that")
        }
    })
}
module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};

