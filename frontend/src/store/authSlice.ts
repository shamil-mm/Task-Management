import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User{
    _id:string
    email:string
}
interface AuthState{
    isAuthenticated:boolean;
    accessToken:string| null;
    user:User|null
}

const initialState:AuthState={
    isAuthenticated:false,
    accessToken:null,
    user:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
       loginSuccess:(state,action:PayloadAction<{token:string,user:User}>)=>{
        state.isAuthenticated=true;
        state.accessToken=action.payload.token;
        state.user=action.payload.user
       } ,
       logout:(state)=>{
        state.accessToken=null,
        state.isAuthenticated=false;
        state.user=null
       },
       refreshToken:(state,action:PayloadAction<string>)=>{
        state.accessToken=action.payload
       }
    }
})

export const {loginSuccess,logout,refreshToken}=authSlice.actions;
export default  authSlice.reducer;