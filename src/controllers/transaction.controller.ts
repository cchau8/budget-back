import { Request, Response } from "express";

import Transaction from "~/models/Transaction";

const createTransaction = async (req: Request, res: Response) => {
    const { title, amount, date, category, currency } = req.body;
    const { userId } = req.user;
    try {
        if (!title || !amount || !category) {
            return res.status(400).json({ message: "Please provide all the fields ❌" });
        }

        const transaction = new Transaction({
            title,
            user: userId,
            category,
            amount,
            currency: currency || "€",
            date: date || Date.now(),
        });

        await transaction.save();
        return res.status(201).json({ message: "New transaction created ! 🔥", transaction });
    } catch (error) {
        console.log(`Create transaction error :\n`, (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};
const showTransaction = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const { userId } = req.user;
    try {
        if (!transactionId) {
            return res.status(400).json("Please provide an id");
        }
        const transaction = await Transaction.findOne({
            $and: [{ user: userId }, { _id: transactionId }],
        });
        if (transaction) {
            return res.status(200).json({ message: "Transaction found ! 🔥", transaction });
        } else {
            return res.status(404).json({ message: "Transaction not found ! ❌" });
        }
    } catch (error) {
        console.log(`Get transaction error :\n`, (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

const showTransactions = async (req: Request, res: Response) => {
    const { userId } = req.user;
    try {
        const transactions = await Transaction.find({ user: userId });
        return res.status(200).json({ message: "Transactions found ! 🔥", transactions });
    } catch (error) {
        console.log(`Get transactions error :\n`, (error as Error).message);
        return res.status(500).json((error as Error).message);
    }
};

const updateTransaction = async (req: Request, res: Response) => {};

const deleteTransaction = async (req: Request, res: Response) => {};

export {
    createTransaction,
    showTransaction,
    showTransactions,
    updateTransaction,
    deleteTransaction,
};
