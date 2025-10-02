import { IAuthRepository } from "../../../ports/output/IAuthRepository";
import { ILoginUserUseCase } from "../../../ports/input/IAthUseCase";
import bcrypt from 'bcryptjs';
import { ITokenService } from "../../../services/Auth/ITokenService";
import { UnauthorizedError } from "../../../../shared/errors/AllErrors";

export class UserLogin implements ILoginUserUseCase{
    constructor(
        private readonly authRepository:IAuthRepository,
        private readonly tokenService:ITokenService,
    ){}
    async execute(data: { email: string; password: string;}): Promise<{email:string,_id:string,accessToken:string,refreshToken:string}> {
      
       
                const user=await this.authRepository.findByEmail(data.email)
                if(!user){
                    throw new UnauthorizedError("Invalid email or password");
                }
                const isPasswordValid= await bcrypt.compare(data.password,user.password)
                if(!isPasswordValid){
                    throw new UnauthorizedError("Invalid email or password")
                }
                
                

                const accessToken= this.tokenService.generateAccessToken({email:user.email})
                const refreshToken= this.tokenService.generateRefreshToken({email:user.email})
                return {email:user.email,_id:user._id?.toString() as string,accessToken,refreshToken }
                
            
    }
}