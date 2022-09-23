import { Request, Response } from "express";

import Category from "~/models/Category";

const createCategory = async (req: Request, res: Response) => {
    const { title, type, icon } = req.body;
    const { userId } = req.user;
    try {
        if (!title || !type || !icon) {
            return res.status(400).json({ message: "Please provide all the fields ❌" });
        }
        const newCategory = new Category({
            title: title,
            user: userId,
            type: type,
            icon: icon,
        });

        await newCategory.save();
        return res.status(201).json({ message: "Category created successfully ! 🔥" });
    } catch (error) {
        console.log("Post category error :\n", (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

const showCategory = async (req: Request, res: Response) => {};

const updateCategory = async (req: Request, res: Response) => {};

const deleteCategory = async (req: Request, res: Response) => {};

export { createCategory, showCategory, updateCategory, deleteCategory };
