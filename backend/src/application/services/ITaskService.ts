import { Task } from "../../domain/entities/Task";
import { CreateTaskDTO,UpdateTaskDTO } from "../../presentation/dtos/TaskDTO";

export interface ITaskService{
    createTask(data: CreateTaskDTO): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    updateTask(id:string,data:UpdateTaskDTO):Promise<Task |null>
    deleteTask(id:string):Promise<boolean>
}