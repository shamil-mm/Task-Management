import { User } from "../../../domain/entities/User";

export interface IAuthRepository{
    create(user:User):Promise<User>;
    findById(id:string):Promise<User |null>;
    findByEmail(email:string):Promise<User |null>;
}