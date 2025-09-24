import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from './infrastructure/web/routes/TaskRoutes'


dotenv.config()

const app: Application=express()

app.use(cors())
app.use(express.json())
app.use('/',(req,res,next)=>{
    console.log("INCOMMING REQUEST" ,req.path)
    if(req.body){
        console.log("BODY",req.body)
    }
    next()
})
app.use('/tasks',taskRoutes)

export default app;