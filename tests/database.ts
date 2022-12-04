import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

const connectDb = async () => {
    const uri = mongoServer.getUri();

    // const mongooseOpts = {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    // };

    await mongoose.connect(uri);
};

const closeDb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

const clearDb = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

export { connectDb, clearDb, closeDb };
