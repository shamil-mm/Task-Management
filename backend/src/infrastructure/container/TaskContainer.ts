import { TaskRepository } from "../database/repositories/TaskRepository";
import { TaskController } from "../web/controllers/TaskController";
import { TaskService } from "../../application/services/TaskService";
import { CreateTask } from "../../application/use-case/create-task/CreateTask";
import { GetAllTasks } from "../../application/use-case/get-all-tasks/GetAllTasks";
import { UpdateTask } from "../../application/use-case/update-task/UpdateTask";
import { DeleteTask } from "../../application/use-case/delete-task/DeleteTask";
const taskRepository=new TaskRepository();

const createTaskUseCase= new CreateTask(taskRepository)
const getAllTasksUseCase=new GetAllTasks(taskRepository)
const updateTaskUseCase= new UpdateTask(taskRepository)
const deleteTaskUseCase=new DeleteTask(taskRepository)
const taskService=new TaskService(createTaskUseCase,getAllTasksUseCase,updateTaskUseCase,deleteTaskUseCase);
const taskController=new TaskController(taskService);

export {taskRepository,taskService,taskController};