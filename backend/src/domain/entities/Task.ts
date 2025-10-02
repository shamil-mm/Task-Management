import { TaskStatus,TaskPriority } from "../value-objects/TaskStatus";

export class Task{
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public status:TaskStatus,
        public priority:TaskPriority,
        public dueDate:Date,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}