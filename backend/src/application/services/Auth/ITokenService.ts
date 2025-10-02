import { JwtPayload } from "jsonwebtoken";

export interface ITokenService{
    generateAccessToken(payload:object):string;
    generateRefreshToken(payload:object):string;
    verifyAccessToken(token:string):JwtPayload |null
    verifyRefreshToken(token:string):JwtPayload |null;
}