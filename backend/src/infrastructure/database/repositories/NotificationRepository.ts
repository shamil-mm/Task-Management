import { INotificationRepository } from "../../../application/ports/output/INotificationRepository";
import { Notification } from "../../../domain/entities/Notification";
import NotificationModel, { INotificationDocument } from "../models/NotificationModel";

export class NotificationRepository implements INotificationRepository {
    async save(notification: Notification): Promise<Notification> {
        const created = await NotificationModel.create(notification);
        return this.toDomain(created);
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        const docs = await NotificationModel.find({ userId });
        return docs.map(this.toDomain);
    }
   

    async markAsRead(notificationId: string): Promise<Notification |null> {
       const notification= await NotificationModel.findByIdAndUpdate(notificationId , { read: true },{ new: true }) 
       if(!notification) return null
       return this.toDomain(notification)
    }
    async remove(notificationId: string): Promise<void> {
        await NotificationModel.deleteOne({ _id: notificationId });
    }
    async countUnread(userId: string): Promise<number> {
        return NotificationModel.countDocuments({ userId, read: false });
    }

    private toDomain(doc: INotificationDocument): Notification {
        return {
            _id: doc._id.toString(),
            userId: doc.userId,
            title: doc.title,
            message: doc.message,
            read: doc.read,
            createdAt: doc.createdAt,
        };
    }
}
