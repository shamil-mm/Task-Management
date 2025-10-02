import mongoose,{Schema,Document} from "mongoose";

export interface INotificationDocument extends Document{
    _id:string;
    userId:string;
    title:string;
    message:string;
    read:boolean;
    createdAt:Date;
}

const NotificationSchema :Schema=new Schema(
    {
        userId:{
            type:String,
            required:true,
            index:true
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },{
        versionKey:false
    }
)

export default mongoose.model<INotificationDocument>("Notification",NotificationSchema)