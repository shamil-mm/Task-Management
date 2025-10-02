import { Notification } from "../../../domain/entities/Notification";

export interface INotificationRepository{
    save(notification:Notification):Promise<Notification>
    findByUserId(userId:string):Promise<Notification[]>;
    markAsRead(notification:string):Promise<Notification|null>
    remove(notificationId: string): Promise<void>
    countUnread(userId: string): Promise<number>
}