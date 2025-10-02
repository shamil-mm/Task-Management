import { INotificationRepository } from "../../../ports/output/INotificationRepository";
import { IRemoveNotificatioin } from "../../../ports/input/INotificationUseCase";

export class RemoveNotificatioin implements IRemoveNotificatioin{
    constructor(
        private readonly notificationRepository:INotificationRepository
    ){}
    async execute(notificationId: string): Promise<void> {
        await this.notificationRepository.remove(notificationId)
    }
}