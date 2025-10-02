import { Notification } from "../../../domain/entities/Notification";

export interface INotificationService {
    CreateNotification(data:{userId: string, title: string, message: string}):Promise<Notification>
    GetAllNotification(userId: string):Promise<Notification[]>
    MarkAsRead(notificationId: string):Promise<void>
    RemoveNotification(notificationId:string):Promise<void>
}