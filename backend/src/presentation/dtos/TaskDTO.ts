export interface CreateTaskDTO{
    title:string;
    description:string;
}

export interface UpdateTaskDTO{
    title?:string;
    description?:string;
    status?:string;
    priority?:string;
}

export interface TaskResponseDTO{
    id:string;
    title:string;
    description:string;
    status:string;
    priority:string
    createdAt:Date;
}