import { TaskRepository } from "../database/repositories/TaskRepository";
import { TaskController } from "../web/controllers/TaskController";
import { TaskService } from "../../application/services/Task/TaskService";
import { CreateTask } from "../../application/use-case/Task/create-task/CreateTask";
import { GetAllTasks } from "../../application/use-case/Task/get-all-tasks/GetAllTasks";
import { UpdateTask } from "../../application/use-case/Task/update-task/UpdateTask";
import { DeleteTask } from "../../application/use-case/Task/delete-task/DeleteTask";

import { notificationService } from "./NotificationContainer";
import { notificationRepository } from "./NotificationContainer";


const taskRepository=new TaskRepository();


const createTaskUseCase= new CreateTask(taskRepository,notificationService)
const getAllTasksUseCase=new GetAllTasks(taskRepository,notificationRepository)
const updateTaskUseCase= new UpdateTask(taskRepository,notificationService)
const deleteTaskUseCase=new DeleteTask(taskRepository,notificationService)
const taskService=new TaskService(createTaskUseCase,getAllTasksUseCase,updateTaskUseCase,deleteTaskUseCase);
const taskController=new TaskController(taskService);

export {taskRepository,taskService,taskController};