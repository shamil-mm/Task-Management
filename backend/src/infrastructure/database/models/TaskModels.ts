import mongoose,{Schema,Document, Types} from "mongoose";

export interface ITaskDocument extends Document{
    _id:Types.ObjectId;
    title:string;
    description:string;
    status:string;
    priority:string;
    dueDate:Date
    createdAt:Date;
    updatedAt:Date;
}

const TaskSchema = new Schema<ITaskDocument>(
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        status:{type:String,required:true,default:"PENDING"},
        priority:{type:String,required:true,default:"LOW"},
        dueDate:{type:Date,required:true}
    },
    {
        timestamps:true
    }
)

export const TaskModel=mongoose.model<ITaskDocument>("Task",TaskSchema)