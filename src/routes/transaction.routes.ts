import express, { Router } from "express";
import {
    createTransaction,
    deleteTransaction,
    showTransaction,
    showTransactions,
    updateTransaction,
} from "~/controllers/transaction.controller";

import { auth } from "~/middlewares/auth.middleware";

const router: Router = express.Router();

router.post("/transaction", auth, createTransaction);

router.get("/transaction/:transactionId", auth, showTransaction);

router.get("/transactions", auth, showTransactions);

router.put("/transaction", auth, updateTransaction);

router.delete("/transaction", auth, deleteTransaction);

export default router;
