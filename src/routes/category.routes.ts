import express, { Router } from "express";
import {
    createCategory,
    showCategory,
    updateCategory,
    deleteCategory,
    showCategories,
} from "~/controllers/category.controller";
import { auth } from "~/middlewares/auth.middleware";

const router: Router = express.Router();

router.post("/category", auth, createCategory);

router.get("/categories", auth, showCategories);

router.get("/category/:categoryId", auth, showCategory);

router.put("/category", auth, updateCategory);

router.delete("/category", auth, deleteCategory);

export default router;
