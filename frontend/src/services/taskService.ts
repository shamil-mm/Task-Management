import toast from "react-hot-toast";
import type { ITask } from "../types/Itask";
import api from "./api";

export const createTask = async (userId:string,data: Partial<ITask>)=>{
    try {
        const response=await api.post('/tasks',{userId,...data});
        console.log('create Task',response)
        return response.data
    } catch (error:any) {
        console.error('error from create task',error)
         if( error?.response?.data?.message){
        toast.error(error?.response?.data?.message)
       }
       console.log(error)
    } 
}
export const getTasks=async(userId:string)=>{
    try {
        
        const response=await api.get(`/tasks/${userId}`);
        return response.data
    } catch (error) {
        console.error('error from get task',error)
    }
}
export const updateTask=async(userId:string,taskId:string,data:Partial<ITask>)=>{
    try {
        const response=await api.put(`/tasks/${taskId}/${userId}`,data);
        return response.data
    } catch (error:any) {
        if( error?.response?.data?.message){
        toast.error(error?.response?.data?.message)
       }
       console.log(error)
        console.error('error from update task',error)
    }
}
export const deleteTask=async(userId:string,taskId:string)=>{
    try {
       const response=await api.delete(`/tasks/${taskId}/${userId}`);
       console.log('delete task response',response)
       return response.data
    } catch (error) {
       console.error('error from delete task',error) 
    }
}