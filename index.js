import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {usersRouter} from "./routes/index.js";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import errorsMiddleware from "./middleware/error-midlevare.js";

// configure
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);

app.use(errorsMiddleware);


const bootstrap = async () => {
    try {
        await mongoose.connect(DB_CONNECTION);
        app.listen(3000, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

bootstrap();