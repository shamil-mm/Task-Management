import { Task } from "../../domain/entities/Task";
import { TaskResponseDTO } from "../dtos/TaskDTO";

export class TaskMapper{
    static toDTO(task:Task):TaskResponseDTO{
        return {
            id:task.id,
            title:task.title,
            description:task.description,
            status:task.status,
            priority:task.priority,
            createdAt:task.createdAt
        }
    }
    static toDTOList(tasks:Task[]):TaskResponseDTO[]{
        return tasks.map((task)=>this.toDTO(task))
    }
}