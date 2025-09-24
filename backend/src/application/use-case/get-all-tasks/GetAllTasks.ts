import { ITaskRepository } from "../../ports/output/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import { IGetAllTaskUseCase } from "../../ports/input/ITaskUseCase";

export class GetAllTasks implements IGetAllTaskUseCase{
    constructor(private taskRepository:ITaskRepository){}
    async execute():Promise<Task[]>{
        return this.taskRepository.findAll()
    }
}