import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";



let socket: Socket | null = null;

export const initSocket = (userId: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL , {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
      socket?.emit("register", userId);
    });


    socket.on("notification", (data) => {
      const text = data.heading ? `${data.heading}\n${data.message}` : data.message;
      toast.success(text,{
        duration: 5000,
        position: "top-center",
        style: {
          whiteSpace: 'pre-line',
        }
      })
    });
  }

  return socket;
};

export const getSocket = () => socket;