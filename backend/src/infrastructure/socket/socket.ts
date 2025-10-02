import { Server } from "socket.io"
import http from "http";
import { ISocketServer } from "./Isocket";
let io:Server;

const userSockets=new Map<string,string>()

export class SocketServer implements ISocketServer{
    public init(server:http.Server):void{
        io=new Server(server,{
            cors:{
                origin:process.env.FRONTEND_URL,
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials:true,
            },
        });
        io.on("connection",(socket)=>{

            console.log("A user connected:",socket.id)

            socket.on("register",(userId:string)=>{
                userSockets.set(userId,socket.id)
                console.log("Registered user:", userId, "socket:", socket.id);
            })
            socket.on("disconnect",()=>{
                for(const [uid,sid] of userSockets){
                    if(sid===socket.id)userSockets.delete(uid)
                }
            })
        })

    }
    public sendNotification(userId:string,heading:string,message:string): void{
        const socketId=userSockets.get(userId);
        if(socketId&& io) {
            const notification={
                heading,
                message,
            }
            io.to(socketId).emit('notification',notification)
        }
    }
    public sendUnreadCount(userId: string, count: number) {
        const socketId=userSockets.get(userId);
        io.to(socketId!).emit("unreadCount", { count });
    }
 
}

