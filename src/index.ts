import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
mongoose.connect("mongodb://localhost:27017/budget", {}, () =>
    console.log("✔ [server]: connected to db")
);

app.use(userRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
