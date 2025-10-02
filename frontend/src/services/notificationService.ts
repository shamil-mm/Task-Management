
import api from "./api"

export const getNotifications=async(userId:string)=>{
    try {
        const response=await api.get(`/notification/${userId}`)
        return response.data
    } catch (error) {
        console.error('error from get all notification',error)
    }
}
export const markAsRead=async(notificationId:number)=>{
    try {
        const response=await api.put(`/notification/${notificationId}`)
        return response.data
    } catch (error) {
        console.error('error from markAsRead',error)
    }
}
export const removeNotification=async(notificationId:number)=>{
    try {
        const response=await api.delete(`/notification/${notificationId}`)
        return response.data
    } catch (error) {
        console.error('error from removeNotificatiom',error)
    }
}