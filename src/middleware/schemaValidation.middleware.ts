import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { Schema } from "mongoose";



const validateSchema = (schema: ObjectSchema) => 
    (req: Request, res: Response, next: NextFunction):void => {
       
        const validatedPayload = schema.validate(req.body);
        if (!validatedPayload) {
             res.status(402).json({ error: "Error in validating schema" });
             return;
        }

        next();
    }



export { validateSchema }