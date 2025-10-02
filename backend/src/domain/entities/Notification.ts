export class Notification{
    public _id?:string;
    public userId:string;
    public title:string;
    public message:string;
    public read: boolean;
    public createdAt:Date;
    constructor(
        props:{userId:string;title:string;message:string;read:boolean;_id?:string,createdAt:Date}
    ){
       if (props._id) {
        this._id=props._id;
       }
        this.title=props.title;
        this.userId=props.userId;
        this.message=props.message;
        this.read=props.read;
        this.createdAt=props.createdAt;
    }
}