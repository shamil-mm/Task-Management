import { INotificationService } from "./INotificationService";
import { Notification } from "../../../domain/entities/Notification";
import { ICreateNotificationUseCase, IGetAllNotificationUseCase, IMarkAsRead, IRemoveNotificatioin } from "../../ports/input/INotificationUseCase";

export class NotificationService implements INotificationService{
    constructor(
        private _createNotificationUseCase:ICreateNotificationUseCase,
        private _getAllNotificationUseCase:IGetAllNotificationUseCase,
        private _markAsReadUseCase:IMarkAsRead,
        private _removeNotification:IRemoveNotificatioin
    ) {}
    CreateNotification(data: { userId: string; title: string; message: string; }): Promise<Notification> {
        return this._createNotificationUseCase.execute(data)
    }
    GetAllNotification(userId: string): Promise<Notification[]> {
        return this._getAllNotificationUseCase.execute(userId)
    }
    MarkAsRead(notificationId: string): Promise<void> {
        return this._markAsReadUseCase.execute(notificationId)
    }
    RemoveNotification(notificationId: string): Promise<void> {
        return this._removeNotification.execute(notificationId)
    }
    
   
}