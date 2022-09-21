import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
// models

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    // const hash = bcrypt.hashSync(req.body.password, 10);
    // console.log(hash);
});

export default router;
