import { User } from "../../../domain/entities/User";
import { LoginUserDTO,RegisterUserDTO } from "../../../presentation/dtos/AuthDTO";

export interface IAuthService{
    userLogin(data:LoginUserDTO):Promise<{email:string,_id:string,accessToken:string,refreshToken:string}>
    userRegister(data:RegisterUserDTO):Promise<User>
}