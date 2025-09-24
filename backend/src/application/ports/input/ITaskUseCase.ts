import { Task } from "../../../domain/entities/Task";

export interface ICreateTaskUseCase{
  execute(data: { title: string; description: string }): Promise<Task>;
}
export interface IGetAllTaskUseCase{
  execute():Promise<Task[]>
}
export interface IUpdateTaskUseCase{
  execute(id:string,data:{ title?: string ; description?: string}):Promise<Task|null>
}
export interface IDeleteTaskUseCase{
  execute(id:string):Promise<boolean>
}