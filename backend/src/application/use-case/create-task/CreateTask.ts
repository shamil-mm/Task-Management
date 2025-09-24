import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../ports/output/ITaskRepository";
import { TaskStatus,TaskPriority } from "../../../domain/value-objects/TaskStatus";
import { ICreateTaskUseCase } from "../../ports/input/ITaskUseCase";

export class CreateTask implements ICreateTaskUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}
    async execute(data:{title:string;description:string}):Promise<Task>{
        const task= new Task(
            "",
            data.title,
            data.description,
            TaskStatus.PENDING,
            TaskPriority.LOW,
            new Date(),
            new Date()
        );

        return this.taskRepository.create(task)
    }
}