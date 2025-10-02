import { UserRepository } from "../database/repositories/AuthRepository";
import { AuthController } from "../web/controllers/AuthController";
import { AuthService } from "../../application/services/Auth/AuthService";
import { UserLogin } from "../../application/use-case/Auth/user-login/LoginUser";
import { UserRegister } from "../../application/use-case/Auth/user-register/RegisterUser";
import { TokenService } from "../../application/services/Auth/TokenService";
import { AuthMiddleware } from "../web/middleware/AuthMiddleware/AuthMiddleware";

const authRepository= new UserRepository()
const tokenService=new TokenService()

const authMiddleware=new AuthMiddleware(tokenService,authRepository)
const userLogin=new UserLogin(authRepository,tokenService)
const userRegister=new UserRegister(authRepository)

const authService=new AuthService(userLogin,userRegister)
const authController=new AuthController(authService)

export {authRepository,authService,authController,authMiddleware}