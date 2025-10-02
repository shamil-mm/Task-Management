import { Task } from "../../../domain/entities/Task";
import { TaskPriority, TaskStatus } from "../../../domain/value-objects/TaskStatus";

export interface ICreateTaskUseCase{
  execute(userId:string,data:{title:string;description:string,status:TaskStatus,priority:TaskPriority,dueDate:Date}): Promise<Task>;
}
export interface IGetAllTaskUseCase{
  execute(userId:string):Promise<{tasks:Task[],unreadCount:number}>
}
export interface IUpdateTaskUseCase{
  execute(userId:string,taskId:string,data:{title?:string;description?:string,status?:TaskStatus,priority?:TaskPriority,dueDate?:Date}):Promise<Task|null>
}
export interface IDeleteTaskUseCase{
  execute(userId:string,taskId:string):Promise<boolean>
}