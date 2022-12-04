import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";

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
const mongoDB = process.env.MONGODB;
if (mongoDB) {
    mongoose.connect(mongoDB, {}, () => console.log("✔ [server]: connected to db"));
}
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(transactionRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
