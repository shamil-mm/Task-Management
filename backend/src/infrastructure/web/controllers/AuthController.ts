import { Request,Response,NextFunction } from "express";
import { IAuthService } from "../../../application/services/Auth/IAuthService";
import { RegisterUserDTO,LoginUserDTO, RefreshTokenDTO } from "../../../presentation/dtos/AuthDTO";
import { userLoginValidation, userRegisterValidation } from "../validation/UserValidation";
import { AuthMapper } from "../../../presentation/mappers/AuthMapper";


export class AuthController{
    constructor(private authService:IAuthService){}
    userLogin=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {error,value}=userLoginValidation.validate(req.body,{abortEarly:false})
            if (error){
                return res.status(400).json({
                    message:"validation failed",
                    details:error.details.map((err)=>err.message)
                })
            }

            const dto:LoginUserDTO={ email:value.email,password:value.password }

            const { email,_id, accessToken, refreshToken }=await this.authService.userLogin(dto)
            const response=AuthMapper.toLoginUserResponseDTO(email,_id,accessToken,"User logged in successfully")
            res.cookie("accessToken",accessToken,{ httpOnly:true, secure:true,maxAge:15*60*1000,sameSite:'none',path:'/'})
            res.cookie("refreshToken",refreshToken,{ httpOnly:true, secure:true,maxAge:7*24*60*60*1000,sameSite:'none',path:'/'})
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    userRegister=async(req:Request,res:Response,next:NextFunction)=>{
        try {
 
            const {error,value}=userRegisterValidation.validate(req.body,{abortEarly:false})
            if (error){
                return res.status(400).json({
                    message:"validation failed",
                    details:error.details.map((err)=>err.message)
                })
            }
            const dto:RegisterUserDTO={ email:value.email,name:value.name,password:value.password }
            const user=await this.authService.userRegister(dto)
            const response=AuthMapper.toRegisterUserResponseDTO(user,"User registered successfully")
            res.status(200).json(response)
        } catch (error) {
           next(error) 
        }
    }
    
    userLogout=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            res.cookie("accessToken","",{ httpOnly:true, secure:true,maxAge:0,sameSite:'none',path:'/'})
            res.cookie("refreshToken","",{ httpOnly:true, secure:true,maxAge:0,sameSite:'none',path:'/'})
            res.status(200).json({message:"User logged out successfully"})
            
        } catch (error) {
         next(error)
        }
    }
}