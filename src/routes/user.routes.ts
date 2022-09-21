import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
// models
import User from "~/models/User";

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const duplicateUser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (duplicateUser) {
            return res.status(400).json({
                message: "The username or the email you're trying to use is already used.",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        user.save();
        return res.status(200).json({ message: "New user successfully created ! 🔥" });
    } catch (error) {}
});

export default router;
