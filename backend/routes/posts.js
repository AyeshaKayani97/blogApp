const router = require('express').Router();
const Post = require("../models/Post")

// create post
router.post("",async (req, res)=>{
            try{
                const newPost = await Post( req.body)
                const savedPost = await newPost.save()
                res.status(200).json(savedPost)
      
            }catch(err){
                res.status(400).json(err)
            }
  
})
// update post
router.put("/:id",async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.name === req.body.name){
            const updatePost = await Post.findByIdAndUpdate(req.params.id,
                {$set:req.body},
                {
                new:true}
                )
                console.log(updatePost)
                res.status(200).json(updatePost)
        }else{
            res.status(400).json("you can update ur post only ")
        }

    }catch(err){
        res.status(400).json(err)
    }

})
// Get single post 

router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)

    }catch(err){
        res.status(400).json(err)
    }
})
 //delete post 

 router.delete("/:id",async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        console.log(post, post.name, req.body.name)
        if(post.name === req.body.name){
           const deletePost = await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("Post has been deleted")
        }else{
            res.status(400).json("you can delete ur post only ")
        }

    }catch(err){
        res.status(400).json(err)
    }

})


// get All post with url parameters values

router.get("",async(req,res)=>{
    try{
        let posts;
        const username = req.query.user
        const catName = req.query.categories
        if(username){
            posts= await Post.find({name:username})
            
        }else if(catName){
            posts = await Post.find({
                categories:{
                    $in:[catName]
                }
            })
            
        }else{
            posts =await Post.find()
            
        }
        
        res.status(200).json(posts)
        
    }catch(error){
        res.status(400).json({error:err})
    }
})






module.exports = router
