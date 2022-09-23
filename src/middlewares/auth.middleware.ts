import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "~/models/User";

export interface IToken {
    user: {
        email: string;
        username: string;
        userId: string;
    };
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
            req.user = (decodedToken as IToken).user;
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};

export { auth };
