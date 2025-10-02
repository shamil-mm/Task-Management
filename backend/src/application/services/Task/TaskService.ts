import { Task } from "../../../domain/entities/Task";
import { ICreateTaskUseCase,IDeleteTaskUseCase,IGetAllTaskUseCase, IUpdateTaskUseCase } from "../../ports/input/ITaskUseCase";
import { ITaskService } from "./ITaskService";
import { CreateTaskDTO,UpdateTaskDTO } from "../../../presentation/dtos/TaskDTO";

export class TaskService implements ITaskService{
    constructor(
        private _createTaskUseCase:ICreateTaskUseCase,
        private _getAllTasksUseCase:IGetAllTaskUseCase,
        private _updateTaskUseCase:IUpdateTaskUseCase,
        private _deleteTaskUseCase:IDeleteTaskUseCase,
    ){}
    
    async createTask(userId:string,data:CreateTaskDTO):Promise<Task>{
        return this._createTaskUseCase.execute(userId,data)
    }
    async getAllTasks(userId:string): Promise<{tasks:Task[],unreadCount:number}> {
        return this._getAllTasksUseCase.execute(userId);
    }
    async updateTask(userId:string,taskId:string,data:UpdateTaskDTO): Promise<Task|null> {
       return this._updateTaskUseCase.execute(userId,taskId,data)
    }
    async deleteTask(userId:string,taskId: string): Promise<boolean> {
       return this._deleteTaskUseCase.execute(userId,taskId);
    }

}