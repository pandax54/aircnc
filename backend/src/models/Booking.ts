// https://www.youtube.com/watch?v=aTf8QTjw4RE&t=1530s 
import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';
import { ISpot } from './Spot';

export interface IBooking extends Document {
    date: string;
    approved?: boolean;
    spot: ISpot['_id'];
    user: IUser['_id'];
};


const BookingSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Spot'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});


const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
