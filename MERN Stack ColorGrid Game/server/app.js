import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';  
import gameRoutes from './routes/gameRouter.js';  



export const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/newgame', gameRoutes);
app.use('/', authRoutes);
app.use('/api/users', userRoutes);



