import { Notification } from "../../../../domain/entities/Notification";
import { INotificationRepository } from "../../../ports/output/INotificationRepository";
import { IGetAllNotificationUseCase } from "../../../ports/input/INotificationUseCase";

export class GetAllNotification implements IGetAllNotificationUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    async execute(userId: string): Promise<Notification[]> {
        const notifications = await this.notificationRepository.findByUserId(userId);
        return notifications;
    }
}