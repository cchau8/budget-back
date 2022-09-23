import { Schema, model } from "mongoose";

interface ITransaction {
    title: string;
    user: Schema.Types.ObjectId;
    category: Schema.Types.ObjectId;
    amount: number;
    currency: string;
    date: Date;
}

const transactionSchema = new Schema<ITransaction>({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "€" },
    date: { type: Date, required: true, default: Date.now() },
});

export default model<ITransaction>("Transation", transactionSchema);
