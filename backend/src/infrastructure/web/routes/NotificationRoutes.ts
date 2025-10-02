import { Router } from "express";
import { notificationController } from "../../container/NotificationContainer";
import { authMiddleware } from "../../container/AuthContainer";


const router=Router()
router.get('/:userId',authMiddleware.verifyToken,notificationController.getAllNotifications)
router.put('/:notificationId',authMiddleware.verifyToken,notificationController.markAsRead)
router.delete('/:notificationId',authMiddleware.verifyToken,notificationController.removeNotification)

export default router