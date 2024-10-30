import jsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';


dotenv.config();

// These middleware verify the JWT Token and Role of the User.

const authenticationToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const token: any = req.headers['authentication'];

    if (!token) {
        res.sendStatus(403);
        return;
    }

    await jsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err: any, user: any) => {
        if (err) {
            res.status(403).json({error:"Access denied. Admin access only"});
            return;
        }
        req.body.user = user
        next();
    })
    
}



const authenticationRole = (...roles: String[]) =>

    (req: Request, res: Response, next: NextFunction): void => {
      
        if (!roles.includes(req.body.user.role)) {
            
            res.sendStatus(403);
            return;
        }

        next();

    }



export { authenticationToken, authenticationRole }