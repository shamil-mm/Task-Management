import { Task } from "../../../../domain/entities/Task";
import { ITaskRepository } from "../../../ports/output/ITaskRepository";
import { TaskStatus,TaskPriority } from "../../../../domain/value-objects/TaskStatus";
import { ICreateTaskUseCase } from "../../../ports/input/ITaskUseCase";
import { INotificationService } from "../../../services/Notification/INotificationService";
import { BadRequestError } from "../../../../shared/errors/AllErrors";





export class CreateTask implements ICreateTaskUseCase{
    constructor(
        private readonly taskRepository:ITaskRepository,
        private readonly notificationService:INotificationService,
    ){}
    async execute(userId:string,data:{title:string;description:string,status:TaskStatus,priority:TaskPriority,dueDate:Date}):Promise<Task>{
         const existingTask = await this.taskRepository.findByTitle(data.title);
         console.log(data.title)
         console.log(existingTask.length)
        if (existingTask.length>0) {
            throw new BadRequestError(`A task with the title "${data.title}" already exists.`);
        }
        const task= new Task(
            "",
            data.title,
            data.description,
            data.status,
            data.priority,
            data.dueDate,
            new Date(),
            new Date(),
        );

        const createdTask = await this.taskRepository.create(task)
        
       await this.notificationService.CreateNotification({
        userId,
        title: "Task Created",
        message: `Task ${data.title} has been created successfully. Due date: ${new Date(data.dueDate).toLocaleDateString()}`
    });
       
        return createdTask;
    }
}