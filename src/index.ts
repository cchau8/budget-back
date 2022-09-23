import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";

dotenv.config();

declare global {
    namespace Express {
        export interface Request {
            user?: any;
        }
    }
}

const app: Express = express();
const port = process.env.PORT;
mongoose.connect("mongodb://localhost:27017/budget", {}, () =>
    console.log("✔ [server]: connected to db")
);
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(categoryRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
