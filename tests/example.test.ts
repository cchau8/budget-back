import mongoose from "mongoose";
import { register } from "~/controllers/user.controller";

import User from "~/models/User";

import { clearDb, connectDb, closeDb } from "./database";

beforeAll(async () => {
    await connectDb();
});

afterEach(async () => {
    await clearDb();
});

afterAll(async () => {
    await closeDb();
});

describe("User model", () => {
    test("should create user in db", async () => {
        const response = await register;
    });
});
