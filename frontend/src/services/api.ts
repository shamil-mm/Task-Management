import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/authSlice";

const api=axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
})

api.interceptors.response.use(
    (response)=>{
        return response
    },
    async(error)=>{
        if(error.response && error.response.status===401 && error.response?.data?.logout){
            store.dispatch(logout())
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
)

export default api