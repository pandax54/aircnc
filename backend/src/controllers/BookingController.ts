// everything about login, registration, log out, listagem de usuarios logados
import User, { IUser } from '../models/User';
import { Request, Response } from 'express';
import Spot, { ISpot } from '../models/Spot';
import Booking, { IBooking } from '../models/Booking';

// index, show, store, update, destroy
export default {
    async store(req: Request, res: Response) {
        const { user_id } = req.headers;

        const { spot_id } = req.params

        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        // resgatar as informacoes das demais tabelas por meio dos ids 
        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);

    }

}