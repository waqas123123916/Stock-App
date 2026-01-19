import {model, Model, models, Schema, type Document } from "mongoose";


export interface WatchListItem extends Document {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
}

const WatchListSchema = new Schema<WatchListItem>({
    userId: { type: String, required: true, index: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    company: { type: String, required: true, trim: true },
    addedAt: { type: Date, default: Date.now }
},
{ timestamps: false}
)

WatchListSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export const WatchList: Model<WatchListItem> = (models?.WatchList as Model<WatchListItem>) || model<WatchListItem>('WatchList', WatchListSchema);