import { Task } from "../../domain/entities/Task";
import { ICreateTaskUseCase,IDeleteTaskUseCase,IGetAllTaskUseCase, IUpdateTaskUseCase } from "../ports/input/ITaskUseCase";
import { ITaskService } from "./ITaskService";
import { CreateTaskDTO,UpdateTaskDTO } from "../../presentation/dtos/TaskDTO";

export class TaskService implements ITaskService{
    constructor(
        private _createTaskUseCase:ICreateTaskUseCase,
        private _getAllTasksUseCase:IGetAllTaskUseCase,
        private _updateTaskUseCase:IUpdateTaskUseCase,
        private _deleteTaskUseCase:IDeleteTaskUseCase,
    ){}
    
    async createTask(data:CreateTaskDTO):Promise<Task>{
        return this._createTaskUseCase.execute(data)
    }
    async getAllTasks(): Promise<Task[]> {
        return this._getAllTasksUseCase.execute();
    }
    async updateTask(id:string,data:UpdateTaskDTO): Promise<Task|null> {
       return this._updateTaskUseCase.execute(id,data)
    }
    async deleteTask(id: string): Promise<boolean> {
       return this._deleteTaskUseCase.execute(id);
    }

}