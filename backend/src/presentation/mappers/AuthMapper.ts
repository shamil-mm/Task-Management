import { User } from "../../domain/entities/User";
import { RegisterUserResponseDTO ,LoginUserResponseDTO} from "../dtos/AuthDTO";


export class AuthMapper{
    static toRegisterUserResponseDTO(user:User,message:string):RegisterUserResponseDTO{
        return{
            name:user.name,
            email:user.email,
            message
        }
    }
    static toLoginUserResponseDTO(email:string,_id:string,accessToken:string,message:string):LoginUserResponseDTO{
        return{
            email,
            _id,
            accessToken,
            message
        }
    }
}