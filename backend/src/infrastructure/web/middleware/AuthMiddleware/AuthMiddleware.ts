import { Request,Response,NextFunction } from "express";
import { ITokenService } from "../../../../application/services/Auth/ITokenService";
import { IAuthRepository } from "../../../../domain/repositories/IAuthRepository";
import { JwtPayload } from "jsonwebtoken";


export class AuthMiddleware{
    constructor(public tokenService:ITokenService,public authRepository:IAuthRepository ){}
    public verifyToken=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;

            
             if (!refreshToken) {
                    res.cookie("accessToken","",{ httpOnly:true, secure:false,maxAge:0,sameSite:'lax'})
                    return res.status(401).json({ message: "Refresh token missing, please login again.",logout:true});
                }
            let userPayload:JwtPayload 
            try {
                userPayload=this.tokenService.verifyRefreshToken(refreshToken)!
            } catch (error) {
                return res.status(401).json({ message: "Invalid refresh token, please login again." });
            }

            const user= await this.authRepository.findByEmail(userPayload.email)
            if (!user) return res.status(404).json({ message: "User not found" });
            if(!accessToken){
                console.log('accesstoken not persist .generate new tokens')
                const newAccessToken= this.tokenService.generateAccessToken({email:user.email})
                const newRefreshToken= this.tokenService.generateRefreshToken({email:user.email})

                res.cookie("accessToken",newAccessToken,{ httpOnly:true, secure:false,maxAge:15*60*1000,sameSite:'lax'})
                res.cookie("refreshToken",newRefreshToken,{ httpOnly:true, secure:false,maxAge:7*24*60*60*1000,sameSite:'lax'})
            }else{
                try {
                    this.tokenService.verifyAccessToken(accessToken)
                } catch (error) {
                    const newAccessToken= this.tokenService.generateAccessToken({email:user.email})
                    res.cookie("accessToken",newAccessToken,{ httpOnly:true, secure:false,maxAge:15*60*1000,sameSite:'lax'})
                }
            }

            next()
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
}