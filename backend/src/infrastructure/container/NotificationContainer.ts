import { NotificationController } from "../web/controllers/NotificationController";
import { NotificationRepository } from "../database/repositories/NotificationRepository";
import { NotificationService } from "../../application/services/Notification/NotificationService";
import { CreateNotification } from "../../application/use-case/Notification/create-notification/CreateNotification";
import { GetAllNotification } from "../../application/use-case/Notification/get-all-notification/GetAllNotification";
import { RemoveNotificatioin } from "../../application/use-case/Notification/remove-notification/RemoveNotification";
import { MarkAsRead } from "../../application/use-case/Notification/mark-as-read/MarkAsRead";
import { SocketServer } from "../socket/socket";

const notificationRepository=new NotificationRepository()
const socketServer= new SocketServer()


const createNotification=new CreateNotification(notificationRepository,socketServer)
const getAllNotification=new GetAllNotification(notificationRepository)
const markAsRead=new MarkAsRead(notificationRepository,socketServer)
const removeNotification=new RemoveNotificatioin(notificationRepository)
const notificationService=new NotificationService(createNotification,getAllNotification,markAsRead,removeNotification)
const notificationController=new NotificationController(notificationService)

export {notificationRepository,notificationService,socketServer,notificationController}