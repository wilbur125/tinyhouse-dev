import { MongoClient } from "mongodb";
import { 
    Booking, 
    Database, 
    Listing, 
    User 
} from "../lib/types";

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    return {
        bookings: db.collection<Booking>("bookings"),
        listings: db.collection<Listing>("listings"),
        users: db.collection<User>("users")
    };
};