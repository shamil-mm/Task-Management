import { Request,Response,NextFunction } from "express";
import { INotificationService } from "../../../application/services/Notification/INotificationService";

export class NotificationController{
    constructor(private notificationService:INotificationService){}

    public getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId 
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const notifications = await this.notificationService.GetAllNotification(userId)
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };
   public markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { notificationId} = req.params;

      const updatedNotification = await this.notificationService.MarkAsRead(notificationId)
      res.status(200).json(updatedNotification);
    } catch (error) {
      next(error);
    }
  };
  public removeNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { notificationId } = req.params;

      await this.notificationService.RemoveNotification(notificationId)
      res.status(200).json({ message: "Notification removed successfully" });
    } catch (error) {
      next(error);
    }
  };

}