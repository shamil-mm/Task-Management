import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from './infrastructure/web/routes/TaskRoutes'
import authRoutes from './infrastructure/web/routes/AuthRoutes'
import notificationRoutes from './infrastructure/web/routes/NotificationRoutes'
import cookieParser from 'cookie-parser'
import { ErrorHandler } from "./infrastructure/web/middleware/ErrorHandler/errorhandlerMiddleware";

dotenv.config()

const app: Application=express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/',(req,res,next)=>{
    console.log("INCOMMING REQUEST" ,req.path)
    if(req.body){
        console.log("BODY",req.body)
    }
    next()
})

app.use('/auth',authRoutes)
app.use('/tasks',taskRoutes)
app.use('/notification',notificationRoutes)
app.use(ErrorHandler.handle)
export default app;