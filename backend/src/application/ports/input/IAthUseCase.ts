import { User } from "../../../domain/entities/User";
export interface ILoginUserUseCase{
    execute(data:{email:string,password:string}):Promise<{email:string,_id:string,accessToken:string,refreshToken:string}>
}
export interface IRegisterUserUseCase{
    execute(data:{name:string,email:string,password:string}):Promise<User>
}
export interface IRefreshTokenUseCase{
    execute(refreshToken:string):Promise<{refreshToken:string;accessToken:string}>
}