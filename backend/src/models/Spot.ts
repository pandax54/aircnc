import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';

export interface ISpot extends Document {
    thumbnail: string;
    company: string;
    price: number;
    techs: String[];
    user: IUser['_id'];
};


const SpotSchema = new Schema({
    thumbnail: {
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
}, {
    toJSON: {
        virtuals: true
    }
});

// imagem aula 03 1:06:00
// agora precisaremos criar uma rota para retornar essa imagem
// importaremos o path no server
SpotSchema.virtual('thumbnail_url').get(function () {
    return `http://localhost:5000/files/${this.thumbnail}`
})

const Spot = mongoose.model<ISpot>('Spot', SpotSchema);

export default Spot;