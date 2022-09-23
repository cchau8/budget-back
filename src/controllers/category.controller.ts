import { Request, Response } from "express";

import Category from "~/models/Category";

const createCategory = async (req: Request, res: Response) => {
    const { title, type, icon } = req.body;
    const { userId } = req.user;
    try {
        if (!title || !type || !icon) {
            return res.status(400).json({ message: "Please provide all the fields ❌" });
        }

        const findDuplicate = await Category.findOne({
            $and: [{ title: title }, { user: userId }],
        });
        if (findDuplicate) {
            return res.status(400).json({ message: "This category already exists ❌" });
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

const showCategories = async (req: Request, res: Response) => {
    const { userId } = req.user;
    try {
        const categories = await Category.find({ user: userId });
        return res.status(200).json(categories);
    } catch (error) {
        console.log("GET categories error :\n", (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

const showCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { userId } = req.user;

    try {
        const category = await Category.findOne({ $and: [{ _id: categoryId }, { user: userId }] });
        if (category) {
            return res.status(200).json(category);
        } else {
            return res.status(404).json({ message: "This category doesn't exist ❌" });
        }
    } catch (error) {
        console.log(`GET category ${categoryId} error :\n`, (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

const updateCategory = async (req: Request, res: Response) => {};

const deleteCategory = async (req: Request, res: Response) => {};

export { createCategory, showCategories, showCategory, updateCategory, deleteCategory };
