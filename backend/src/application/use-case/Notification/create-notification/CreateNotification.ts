import { Notification } from "../../../../domain/entities/Notification";
import { INotificationRepository } from "../../../ports/output/INotificationRepository";
import { ICreateNotificationUseCase } from "../../../ports/input/INotificationUseCase";
import { ISocketServer } from "../../../../infrastructure/socket/Isocket";

export class CreateNotification implements ICreateNotificationUseCase{
    constructor(
        private readonly notificationRepository:INotificationRepository,
        private readonly socketService:ISocketServer
    ){}
    async execute(data:{userId: string, title: string, message: string}): Promise<Notification> {
        const notification=new Notification({
            userId:data.userId,
            title:data.title,
            message:data.message,
            read:false,
            createdAt:new Date()
    })

        const createdNotification=await this.notificationRepository.save(notification)
        const unreadCount=await this.notificationRepository.countUnread(data.userId)
         this.socketService.sendNotification(createdNotification.userId,createdNotification.title,createdNotification.message)
         this.socketService.sendUnreadCount(createdNotification.userId, unreadCount);
        return createdNotification
    }
}