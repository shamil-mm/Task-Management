import app from "./app";
import { connectDB } from "./infrastructure/database/connection/db";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`Server running on PORT ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
};
startServer()

