import jwt, { JwtPayload } from 'jsonwebtoken'
import { ITokenService } from './ITokenService'

export class TokenService implements ITokenService{

    generateAccessToken(payload:object):string{
        return jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:"15m"})
    }
    generateRefreshToken(payload:object):string{
        return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET!,{expiresIn:"7d"})
    }
    verifyAccessToken(token:string):JwtPayload |null{
        try {
            return jwt.verify(token,process.env.JWT_SECRET!)as JwtPayload
        } catch (error) {
            return null
        }
    }
    verifyRefreshToken(token:string):JwtPayload |null{
        try {
            return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!) as JwtPayload
        } catch (error) {
            return null
        }
    }
}