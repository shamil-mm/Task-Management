import { Request,Response,NextFunction } from "express";
import { ITaskService } from "../../../application/services/Task/ITaskService";
import { CreateTaskDTO, UpdateTaskDTO } from "../../../presentation/dtos/TaskDTO";
import { TaskMapper } from "../../../presentation/mappers/TaskMapper";

export class TaskController{
    constructor(private taskService: ITaskService){}
    createTask=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {title,description,status,priority,dueDate,userId}=req.body;

            const dto:CreateTaskDTO = {
                title,
                description,
                dueDate,
                status,
                priority
            }

            const task=await this.taskService.createTask(userId,dto)
            const response = TaskMapper.toDTO(task)
            console.log(response)
            res.status(201).json(response)
        } catch (error) {
           next(error) 
        }
    }
    getAllTasks =async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {userId} = req.params
            const tasks=await this.taskService.getAllTasks(userId)
            const response=TaskMapper.toDTOList(tasks.tasks)
            res.status(201).json({unreadCount:tasks.unreadCount,tasks:tasks.tasks})
        } catch (error) {
            next(error) 
        }
    }
    updateTask= async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {taskId,userId} = req.params
            console.log("taskId",taskId)
            console.log("userId",userId)
            const {title,description,status,priority,dueDate}=req.body
            const dto:UpdateTaskDTO={
                title,
                description,
                status,
                priority,
                dueDate
            }
            const updatedTask= await this.taskService.updateTask(userId,taskId,dto)
            if(!updatedTask){
                return res.status(404).json({ message:"Task not fount" })
            }

            const response=TaskMapper.toDTO(updatedTask)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    deleteTask=async(req:Request,res:Response,next:NextFunction)=>{
        try {
           const {taskId,userId}=req.params 
           const deleted= await this.taskService.deleteTask(userId,taskId)
           
           if(deleted){
            return res.status(404).json({message:"Task deleted successfully"})
           }
        } catch (error) {
           next(error) 
        }
    }
}
