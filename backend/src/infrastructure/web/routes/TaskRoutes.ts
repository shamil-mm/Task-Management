import { Router } from "express";
import { taskController } from "../../container/TaskContainer";
import { validate } from "../middleware/ValidationMiddleware";
import { createTaskSchema,updateTaskSchema } from "../validation/TaskValidation";
import { authMiddleware } from "../../container/AuthContainer";

const router=Router();

router.post('/',authMiddleware.verifyToken,validate(createTaskSchema),taskController.createTask)
router.get('/:userId',authMiddleware.verifyToken,taskController.getAllTasks)
router.put('/:taskId/:userId',authMiddleware.verifyToken,validate(updateTaskSchema),taskController.updateTask)
router.delete('/:taskId/:userId',authMiddleware.verifyToken,taskController.deleteTask)

export default router;