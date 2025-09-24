import { TaskStatus,TaskPriority } from "../value-objects/TaskStatus";

export class Task{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public status:TaskStatus,
        public priority:TaskPriority,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}