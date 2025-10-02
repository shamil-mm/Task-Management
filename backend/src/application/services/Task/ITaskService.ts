import { Task } from "../../../domain/entities/Task";
import { CreateTaskDTO,UpdateTaskDTO } from "../../../presentation/dtos/TaskDTO";

export interface ITaskService{
    createTask(userId:string,data: CreateTaskDTO): Promise<Task>;
    getAllTasks(userId:string): Promise<{tasks:Task[],unreadCount:number}>;
    updateTask(userId:string,id:string,data:UpdateTaskDTO):Promise<Task |null>
    deleteTask(userId:string,id:string):Promise<boolean>
}