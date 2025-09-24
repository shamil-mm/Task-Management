import { Task } from "../../../domain/entities/Task";

export interface ITaskRepository {
    create(task:Task):Promise<Task>;
    findAll():Promise<Task[]>;
    findById(id:string):Promise<Task|null>;
    update(id:string,updates:Partial<Task>):Promise<Task|null>;
    delete(id:string):Promise<boolean>;
}