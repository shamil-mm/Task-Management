import { Notification } from "../../../domain/entities/Notification";

export interface ICreateNotificationUseCase{
    execute(data:{userId: string, title: string, message: string}):Promise<Notification>
}
export interface IGetAllNotificationUseCase{
    execute(userId:string):Promise<Notification[]>
}
export interface IMarkAsRead{
    execute(notificationId:string):Promise<void>
}
export interface IRemoveNotificatioin{
    execute(notificationId:string):Promise<void>
}