import { User } from "../../../domain/entities/User";
import { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IAuthRepository{
    async create(user:User):Promise<User>{
        const created=await UserModel.create({
            name:user.name,
            email:user.email,
            password:user.password
        })
        return new User({
           name:created.name,
           email:created.email,
           password:created.password,
           _id:created._id.toString(),

    })
    }
    async findById(id:string):Promise<User |null>{
        const found = await UserModel.findById(id).exec()
        if(!found) return null;
        return new User({
            _id: found._id.toString(),
            name: found.name,
            email: found.email,
            password: found.password,
        })
    }
    async findByEmail(email:string):Promise<User |null>{
        const found = await UserModel.findOne({ email }).exec();
        if (!found) return null;

        return new User({
            _id: found._id.toString(),
            name: found.name,
            email: found.email,
            password: found.password,
        });
    }
}