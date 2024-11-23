// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import  connectDB from "./db/index.js";
import express from "express";
import userRouter from "./routes/user.router.js";

const app = express();

dotenv.config({
    path:'./.evn'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`SERVER is running at poet ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
    
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//routes import





//routes declaration

app.use("/api", userRouter)


















/*
import express from "express";
const app = express()

advancr approch of db connection using of ifes

;( async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME }`)
       app.on("error",(error)=>{
        console.log("ERROR: ", error);
        throw error
        
       })
       app.listen(process.env.PORT,()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
        
       })
    

    } 
    catch (error) {
        console.error("ERROR: ",error);
        throw err
        
    }
})()*/