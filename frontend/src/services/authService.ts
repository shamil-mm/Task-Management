import type { ILoginData, IRegisterData } from "../types/Iauth";
import api from "./api";
import toast from "react-hot-toast";

export const loginUser = async (data: ILoginData)=>{
    try {
        const response=await api.post('/auth/login',data);
        return response?.data
    } catch (err:any) {
       if( err?.response?.data?.message){
        toast.error(err?.response?.data?.message)
       }
       console.log(err)
    }
   
}
export const registerUser = async(data:IRegisterData)=>{
    const response=await api.post('/auth/register',data);
    return response.data
}
export const logoutUser= async()=>{
    await api.post('/auth/logout')
}
