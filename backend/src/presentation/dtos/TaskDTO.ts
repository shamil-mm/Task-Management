import { TaskPriority, TaskStatus } from "../../domain/value-objects/TaskStatus";

export interface CreateTaskDTO{
    title:string;
    description:string;
    dueDate:Date;
    status:TaskStatus;
    priority:TaskPriority; 
}

export interface UpdateTaskDTO{
    title?:string;
    description?:string;
    status?:TaskStatus;
    dueDate? :Date;
    priority?:TaskPriority;
}

export interface TaskResponseDTO{
    _id:string;
    title:string;
    description:string;
    status:TaskStatus;
    priority:TaskPriority; 
    dueDate:Date;
    createdAt:Date;
}