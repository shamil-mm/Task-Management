import { Task } from "../entities/Task";
// import { TaskStatus,TaskPriority } from "../value-objects/TaskStatus";

export interface ITaskRepository{
    create(task:Task):Promise<Task>;
    findAll():Promise<Task[]>;
    findById(id:string):Promise<Task|null>;
    update(id:string,updates:Partial<Task>):Promise<Task|null>;
    delete(id:string):Promise<boolean>;
}