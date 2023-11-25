const router = require('express').Router();
const CryptoJS = require("crypto-js")
const bcrypt = require("bcrypt")

const userModel = require("../models/User")

// update
router.put("/:id",async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
            try{
                const updatedUser = await userModel.findByIdAndUpdate( req.params.id, {
                    $set:req.body,
                },{new:true})
                res.status(200).json(updatedUser)
      
            }catch(err){
                res.status(400).json(err)
            }

        }
    }
   
  
})
// delete
router.delete("/:id",async (req, res)=>{
    if(req.body.userId === req.params.id){
        try{
            await userModel.findByIdAndDelete( req.params.id)
 
       }
       catch(err){
           res.status(400).json(err)
       }
        
    }
})



module.exports = router
