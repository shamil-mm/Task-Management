import http from 'http'
import app from "./app";
import { connectDB } from "./infrastructure/database/connection/db";
import { socketServer } from './infrastructure/container/NotificationContainer';


const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB()
    const server=http.createServer(app)
    socketServer.init(server)
    server.listen(PORT,()=>{
        console.log(`Server running on PORT ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
};
startServer()

