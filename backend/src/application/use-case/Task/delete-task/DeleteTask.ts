import { IDeleteTaskUseCase } from "../../../ports/input/ITaskUseCase";
import { ITaskRepository } from "../../../ports/output/ITaskRepository";
import { INotificationService } from "../../../services/Notification/INotificationService";

export class DeleteTask implements IDeleteTaskUseCase {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly notificationService:INotificationService,
    ) {}

    async execute(userId:string,taskId: string): Promise<boolean> {
        const deletedTask= await this.taskRepository.delete(taskId);

        await this.notificationService.CreateNotification({
        userId,
        title: "Task Deleted",
        message: `Task "${deletedTask?.title}" has been deleted successfully.`
    });
        return !!deletedTask
    }
}