import { Request, Response } from "express";
import { generateAccessToken, generateRefressToken } from "../utils/jwt.utils";
import Jwt from "jsonwebtoken";
import User from "../modal/user";
import brcypt from 'bcryptjs';
import { sendVerificationEmail } from "../utils/email.service";

const registerUser = async (req: Request, res: Response) => {

    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await brcypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, role });

        await user.save();

        // Commented verificationEmail feature because it required a dynamica verification link to send verification email.

        // await sendVerificationEmail(email, 'verification_link');

        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error: any) {

        res.status(400).json({ error: error.message });
    }
};


const login = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const validate = await brcypt.compare(password, user.password as string);

        if (!validate) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const accessToken = await generateAccessToken({ id: user._id, role: user.role });
        const refressToken = await generateRefressToken({ id: user._id, role: user.role });

        user.refreshToken = refressToken;

        // Insert refresh token in the Database.
        await user.save();

        res.status(200).json({ accessToken, refressToken });


    } catch (error: any) {
        res.status(500).json({ message: 'Server side error!' });
    }
};


const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {


        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const skip = (page - 1) * limit;

        const user = await User.find({}).skip(skip).limit(limit);

        const totalUser = await User.countDocuments();

        res.json({
            total: totalUser,
            page,
            limit,
            totalPages: Math.ceil(totalUser / limit),
            data: user
        })


    } catch (error: any) {
        res.status(400).json({ message: 'Server side error!' });
        return;
    }
}


const getUserByID = async (req: Request, res: Response): Promise<void> => {

    try {

        const id = parseInt(req.params.id);

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);

    } catch (error: any) {
        res.status(402).json({ message: 'Server side error!' });
        return;
    }

}


const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const id = req.params;
        const payload = req.body;

        const user = await User.findByIdAndUpdate(id, payload, { new: true });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);

    } catch (error) {
        res.status(402).json({ message: 'Server Side Error!' });
        return;
    }
}


const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const id = req.params;

        const user = await User.findByIdAndUpdate(id, { deleted: true }, { new: true });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({ message: "User account soft deleted", user });



    } catch (error) {
        res.status(403).json({ message: 'Server Side Error!' });
        return;
    }
}


const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(403).json({ message: 'Refresh Token Required' });
            return;
        }

        const parsedTokenData: any = await Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        const user = await User.findById(parsedTokenData.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const newAccessToken = await generateAccessToken({ id: user.id, role: user.role });
        const newRefressToken = await generateRefressToken({ id: user.id, role: user.role });

        res.json({ accessToken: newAccessToken, refreshToken: newRefressToken });

    } catch (error) {
        res.status(403).json({ message: 'Server side error!' });
    }
}


export { registerUser, login, getAllUsers, getUserByID, updateUser, deleteUser, refreshToken };

