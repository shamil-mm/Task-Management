import { Task } from "../entities/Task";

export interface ITaskRepository{
    create(task:Task):Promise<Task>;
    findAll():Promise<Task[]>;
    findById(id:string):Promise<Task|null>;
    update(taskId:string,updates:Partial<Task>):Promise<Task|null>;
    delete(id: string): Promise<Task |null>;
    findByTitle(title: string): Promise<Task[]>
}