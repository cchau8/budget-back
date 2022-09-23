import express, { Router } from "express";
import {
    createCategory,
    showCategory,
    updateCategory,
    deleteCategory,
} from "~/controllers/category.controller";
import { auth } from "~/middlewares/auth.middleware";

const router: Router = express.Router();

router.post("/category", auth, createCategory);

router.get("/category", auth, showCategory);

router.put("/category", auth, updateCategory);

router.delete("/category", auth, deleteCategory);

export default router;
