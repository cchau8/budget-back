import { Request, Response } from "express";

// PACKAGES
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// UTILS
import { checkPassword } from "~/utils/password/checkPassword";

// MODELS
import User from "~/models/User";

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        // check for duplicate users
        const duplicateUser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (duplicateUser) {
            return res.status(409).json({
                message: "The username or the email you're trying to use is already used.",
            });
        }
        // check for correct password
        if (!checkPassword(password)) {
            return res.status(409).json({
                message: "The password does not meet the correct recommendations",
            });
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // create new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        user.save();

        // create token
        const payload = {
            user: {
                username: user.username,
                email: user.email,
                userId: user._id,
            },
        };
        const token = jwt.sign(payload, "RANDOM-TOKEN", { expiresIn: "24h" });

        return res.status(200).json({
            message: "New user successfully created ! 🔥",
            token,
        });
    } catch (error) {
        console.log("Register error :\n", (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("nop");
        }

        // check if password is correct
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // create token
            const payload = {
                user: {
                    username: user.username,
                    email: user.email,
                    userId: user._id,
                },
            };
            const token = jwt.sign(payload, "RANDOM-TOKEN", { expiresIn: "24h" });

            res.status(200).send({
                message: "Logged successfully 🔥",
                token,
            });
        }
    } catch (error) {
        console.log("Login error :\n", (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

export { login, register };
