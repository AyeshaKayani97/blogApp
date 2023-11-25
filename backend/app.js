
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
require("dotenv").config()
const Port = process.env.PORT || 5000
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const postRouter = require("./routes/posts")
const categoryRouter = require("./routes/categories")
const multer = require("multer")
const path = require("path")



app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(express.urlencoded({ extended: true }));
// connectDatabase()
// const router = require("./routes/auth")
// app.use(router)
// const port = process.env.PORT
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true
})
.then(data => console.log("connection successful"))
.catch(error =>console.log("connection failed"))
mongoose.connection.on('error', error => {
    console.error('MongoDB connection error:', error);
  });
// port = 3001
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)

  }
}
)
const upload = multer({storage:storage})
app.post("/api/upload/", upload.single("file"),(req,res)=>{
  res.status(200).json("file has been uploaded")
})

app.use("/api/auth/",authRouter)
app.use("/api/user/",userRouter)
app.use("/api/posts/",postRouter)
app.use("/api/categories/",categoryRouter)





app.listen(Port, ()=>{
console.log("listening to port " + Port)
})



