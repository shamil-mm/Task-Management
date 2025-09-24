import type { ILoginData, IRegisterData } from "../types/Iauth";
import api from "./api";

export const loginUser = async (data: ILoginData)=>{
    const response=await api.post('/auth/login',data);
    return response.data
}
export const registerUser = async(data:IRegisterData)=>{
    const response=await api.post('/auth/register',data);
    return response.data
}