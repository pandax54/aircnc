import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
};


const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});


const User = mongoose.model<IUser>('User', UserSchema);

export default User;



