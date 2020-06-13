// everything about login, registration, log out, listagem de usuarios logados
// import User, { IUser } from '../models/User';
import { Request, Response } from 'express';
import Spot, { ISpot } from '../models/Spot';

// index, show, store, update, destroy
export default {
    async show(req: Request, res: Response) {
        // verificar o usuário logado
        const { user_id } = req.headers

        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }

}