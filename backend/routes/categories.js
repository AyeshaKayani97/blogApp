const router = require('express').Router();
const Category = require("../models/Category")

// create category
router.post("",async(req,res)=>{
    try{
        const newCat = await new Category(req.body)
        const saveCategory= await newCat.save()
        res.status(200).json(saveCategory)
        
    }catch(err){
        res.status(400).json({error:err})
    }
})
// get All categories
router.get("",async(req,res)=>{
    try{
        const cat =await  Category.find()
        res.status(200).json(cat)
        
    }catch(err){
        res.status(400).json({error:err})
    }
})
// get single category
router.get("/:id",async(req,res)=>{
    const id= req.params.id

    try{
        const cat =await  Category.findById(id)
        res.status(200).json(cat)
        
    }catch(err){
        res.status(400).json({error:err})
    }
})
router.put("/:id", async(req, res)=>{
    const id= req.params.id

    try{
        const cat =await  Category.findByIdAndUpdate(id, 
            {$set:req.body},
            {new:true}
            
            )


        res.status(200).json(cat)

    }catch(error){
        res.status(400).json({err:error})
    }
})






module.exports = router
