import { User } from "../../../domain/entities/User";
import { ILoginUserUseCase,IRefreshTokenUseCase,IRegisterUserUseCase } from "../../ports/input/IAthUseCase";
import { IAuthService } from "./IAuthService";
import { LoginUserDTO,RegisterUserDTO } from "../../../presentation/dtos/AuthDTO";


export class AuthService implements IAuthService{
    constructor(
        private _loginUserUseCase:ILoginUserUseCase,
        private _registerUserUseCase:IRegisterUserUseCase,
   
    ){}
    async userLogin(data: LoginUserDTO): Promise<{email:string,_id:string,accessToken:string,refreshToken:string}> {
            return this._loginUserUseCase.execute(data)
    }
    async userRegister(data: RegisterUserDTO): Promise<User> {
        return this._registerUserUseCase.execute(data)
    }
   
}