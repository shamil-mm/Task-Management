export interface INotification{
    _id:number,
    userId:number,
    title:string,
    message:string,
    read:boolean,
    createdAt:Date
}