import mongoose,{Schema,Document,Types} from "mongoose";
export interface IUserDocument extends Document{
    _id:Types.ObjectId;
    name:string;
    email:string;
    password:string
}

const UserSchema = new Schema <IUserDocument>(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
    }
)
export const UserModel=mongoose.model<IUserDocument>("User",UserSchema)