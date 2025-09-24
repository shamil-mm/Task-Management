import { Task } from "../../../domain/entities/Task";
import { IUpdateTaskUseCase } from "../../ports/input/ITaskUseCase";
import { ITaskRepository } from "../../ports/output/ITaskRepository";

export class UpdateTask implements IUpdateTaskUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}
    async execute(id:string,data:{ title?: string ; description?: string}):Promise<Task|null>{
        const updatedTask=await this.taskRepository.update(id,data)
        return updatedTask
    }
}