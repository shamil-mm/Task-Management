import { INotificationRepository } from "../../../ports/output/INotificationRepository";
import { IMarkAsRead } from "../../../ports/input/INotificationUseCase";
import { ISocketServer } from "../../../../infrastructure/socket/Isocket";

export class MarkAsRead implements IMarkAsRead {
    constructor(
        private readonly notificationRepository: INotificationRepository,
        private readonly socketService:ISocketServer
    ) {}

    async execute(notificationId: string): Promise<void> { 
        const notification= await this.notificationRepository.markAsRead(notificationId);
         const unreadCount=await this.notificationRepository.countUnread(notification?.userId!)
         this.socketService.sendUnreadCount(notification?.userId!, unreadCount);
    }
}
