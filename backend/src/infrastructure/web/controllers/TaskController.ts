import { Request,Response,NextFunction } from "express";
import { ITaskService } from "../../../application/services/ITaskService";
import { CreateTaskDTO, UpdateTaskDTO } from "../../../presentation/dtos/TaskDTO";
import { TaskMapper } from "../../../presentation/mappers/TaskMapper";

export class TaskController{
    constructor(private taskService: ITaskService){}
    createTask=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {title,description}=req.body;

            const dto:CreateTaskDTO = {
                title:req.body.title,
                description:req.body.description
            }

            const task=await this.taskService.createTask(dto)
            const response = TaskMapper.toDTO(task)
            res.status(201).json(response)
        } catch (error) {
           next(error) 
        }
    }
    getAllTasks =async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const tasks=await this.taskService.getAllTasks()
            const response=TaskMapper.toDTOList(tasks)
            res.status(201).json(response)
        } catch (error) {
            next(error) 
        }
    }
    updateTask= async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {id} = req.params
            const {title,description}=req.body
            const dto:UpdateTaskDTO={
                title,
                description
            }
            const updatedTask= await this.taskService.updateTask(id,dto)
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
           const {id}=req.params 
           const deleted= await this.taskService.deleteTask(id)
           if(!deleted){
            return res.status(404).json({message:"Task deleted successfully"})
           }
        } catch (error) {
           next(error) 
        }
    }
}
