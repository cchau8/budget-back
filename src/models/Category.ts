import { Schema, model } from "mongoose";

export type categoryType = "expense" | "income" | "savings";

interface ICategory {
    title: string;
    user: Schema.Types.ObjectId;
    type: categoryType;
    icon: string;
}

const categorySchema = new Schema<ICategory>({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["expense", "income", "savings"], required: true },
    icon: { type: String, required: true },
});

export default model<ICategory>("Category", categorySchema);
