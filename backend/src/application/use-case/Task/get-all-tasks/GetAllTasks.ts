import { ITaskRepository } from "../../../ports/output/ITaskRepository";
import { Task } from "../../../../domain/entities/Task";
import { IGetAllTaskUseCase } from "../../../ports/input/ITaskUseCase";
import { INotificationRepository } from "../../../ports/output/INotificationRepository";

export class GetAllTasks implements IGetAllTaskUseCase{
    constructor(
        private taskRepository:ITaskRepository,
        private notificationRepository: INotificationRepository
    ){}
    async execute(userId:string):Promise<{tasks:Task[],unreadCount:number}>{
         const [tasks, unreadCount] = await Promise.all([
            this.taskRepository.findAll(),
            this.notificationRepository.countUnread(userId)
        ]);
        return {tasks,unreadCount}
    }
}  