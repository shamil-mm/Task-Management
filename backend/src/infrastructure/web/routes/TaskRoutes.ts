import { Router } from "express";
import { taskController } from "../../container/TaskContainer";
import { validate } from "../middleware/ValidationMiddleware";
import { createTaskSchema,updateTaskSchema } from "../validation/TaskValidation";
const router=Router();
router.post('/',validate(createTaskSchema),taskController.createTask)
router.get('/',taskController.getAllTasks)
router.put('/:id',validate(updateTaskSchema),taskController.updateTask)
// router.delete('/:id',taskController.deleteTask)

export default router;