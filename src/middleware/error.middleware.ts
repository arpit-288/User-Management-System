import { Request, Response, NextFunction } from "express";


const jsonParseErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof SyntaxError  && 'body' in err) {
        res.status(400).json({ error: 'Invalid JSON format. Ensure double quotes are used around keys and string values.' })
    }
    next();
}


export default jsonParseErrorHandler;