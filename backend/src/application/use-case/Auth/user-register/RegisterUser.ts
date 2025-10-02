import { User } from "../../../../domain/entities/User";
import { IAuthRepository } from "../../../ports/output/IAuthRepository";
import { IRegisterUserUseCase } from "../../../ports/input/IAthUseCase";
import bcrypt from 'bcryptjs'
import { BadRequestError } from "../../../../shared/errors/AllErrors";

export class UserRegister implements IRegisterUserUseCase{
    constructor(private readonly authRepository:IAuthRepository){}
    async execute(data: { name: string; email: string; password: string; }): Promise<User> {

         const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) {
            throw new BadRequestError('User with this email already exists')
        }
        const hashedPassword=await bcrypt.hash(data.password,10)
        const user = new User(
             {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                _id:""
            }
        )
        const createdUser=await this.authRepository.create(user)
        const {password,...createdUserWithoutPassword}=createdUser
        return createdUserWithoutPassword as User
    }
}