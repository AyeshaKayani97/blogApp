const router = require('express').Router();
const userModel = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


router.post("/register", async (req, res)=>{
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password,salt)

    const user = new userModel({
    name: req.body.name,
     email: req.body.email,
     password:hashPass
    
    })
    console.log(user)
    try{
        const saveUser = await  user.save();
        res.status(200).json(saveUser)

    }catch(e){
        res.status(400).json(e)
    }
    
})
// login 
router.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ name: req.body.name })
        if (!user) {
            return res.status(400).json("Wrong credentials");
        }

        const validate = await bcrypt.compare(req.body.password, user.password)
        if (!validate) {
            return res.status(400).json("Wrong credentials");
        }

        const { password, ...others } = user._doc
        res.status(200).json(others);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

// router.post("/login", async(req, res)=>{
//     try{
//         const user = await userModel.findOne({name:req.body.name})
//         !user && res.status(400).json("wrong credentials")
//         const validate = await bcrypt.compare(req.body.password, user.password)
//         !validate && res.status(400).json("wrong credentials")
//         const {password, ...others} = user._doc


//         res.status(200).json(others)

//     }catch(err){
//         res.json(err)
//     }
// })
module.exports = router

