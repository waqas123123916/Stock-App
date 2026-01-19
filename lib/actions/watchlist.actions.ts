import { WatchList } from "@/database/models/watchlist.model";
import { connectToDatabase } from "@/database/mongoose";

export async function getWatchlistSymbolsByEmail(email:string): Promise<string[]> {
    if(!email) return [];
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if(!db) throw new Error('Database connection not established');

        const user = await db.collection('users').findOne<{ _id: unknown; id?: string; email?: string }>(
            {email},
            { projection: { _id: 1, id: 1 } }
        );
        if(!user) {
            console.warn("No user found for email:", email);
            return [];
        }

        const userId = (user.id as string) || String(user._id || '');
        if(!userId) {
            console.warn("User ID not found for email:", email);
            return [];
        }

        const items = await WatchList.find({ userId }).select('symbol -_id').lean();
        return items.map((i)=> String(i.symbol).toUpperCase());
        
    } catch (error) {
        console.error("Error fetching watchlist symbols for email:", error);
        return []
    }
    
}