import dotenv from 'dotenv';
import express from 'express';
import userRoute from './routes/user.routes'
import connection from './config/db.config';
import fs from 'fs';
import morgan from 'morgan';
import jsonParseErrorHandler from './middleware/error.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './config/swagger.config';
import path from 'path';


const app = express();


// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream })); // Log to file

// Log requests to console in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Configure dotenv file
dotenv.config();

// System Middlware

app.use(express.json());
app.use(jsonParseErrorHandler);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));


// Use IIFE (immediately invoked function expression) to connect server from Database

(async function connectToDB ()  {
    try {
       await connection();
    } catch (error) {
        console.log(error);
    }
})()


// All the api having endpoint /user will route to the userRoute router file

app.use('/api/users', userRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT:`, process.env.PORT);
})