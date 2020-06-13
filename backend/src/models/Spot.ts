import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';

export interface ISpot extends Document {
    thumnail: string;
    company: string;
    price: number;
    techs: String[];
    user: IUser['_id'];
};


const SpotSchema = new Schema({
    thumnail: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    techs: {
        type: [String],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});


const Spot = mongoose.model<ISpot>('Spot', SpotSchema);

export default Spot;