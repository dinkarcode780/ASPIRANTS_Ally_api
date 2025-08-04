import app from "./app.js";
dotenv.config();
import dotenv from "dotenv";

import {createServer} from "http";
import databaseConnection from "./config/db.js";

const PORT = process.env.PORT || 6567;

await databaseConnection();


const server = createServer(app);



server.listen(PORT,()=>{
    console.log(`Server is runnig on port ${process.env.PORT}`)
})