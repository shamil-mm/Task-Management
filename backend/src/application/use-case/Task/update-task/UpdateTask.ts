import { Task } from "../../../../domain/entities/Task";
import { TaskPriority, TaskStatus } from "../../../../domain/value-objects/TaskStatus";
import { BadRequestError } from "../../../../shared/errors/AllErrors";
import { IUpdateTaskUseCase } from "../../../ports/input/ITaskUseCase";
import { ITaskRepository } from "../../../ports/output/ITaskRepository";
import { INotificationService } from "../../../services/Notification/INotificationService";

export class UpdateTask implements IUpdateTaskUseCase{
    constructor(
        private readonly taskRepository:ITaskRepository,
         private readonly notificationService:INotificationService,
    ){}
    async execute(userId:string,taskId:string,data:{title?:string;description?:string,status?:TaskStatus,priority?:TaskPriority,dueDate?:Date}):Promise<Task|null>{
            if (data.title) {
                const existingTask = await this.taskRepository.findByTitle(data.title);
                console.log("existing task",existingTask)
        
           if (existingTask.length && existingTask[0]._id !== taskId) {
              throw new BadRequestError("Task with this title already exists");
            }
        }
        const updatedTask=await this.taskRepository.update(taskId,data)
        this.notificationService.CreateNotification({
            userId,
            title:"Task Updated",
            message: `Task "${updatedTask?.title}" has been updated`
        })
        return updatedTask
    }
}