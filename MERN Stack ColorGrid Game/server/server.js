import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { socketConfig } from './config/socketConfig.js';
import { connectDB } from './config/db.js';


config({
  path: './config.env', 
});

connectDB();

const server = http.createServer(app);
socketConfig(server);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
