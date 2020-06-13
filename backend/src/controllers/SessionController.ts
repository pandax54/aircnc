// everything about login, registration, log out, listagem de usuarios logados
import User, { IUser } from '../models/User';
import { Request, Response } from 'express';

// index, show, store, update, destroy
export default {
    async store(req: Request, res: Response) {

        const { email } = req.body;

        // vai verificar se já existe um usuário com esse email
        let user = await User.findOne({ email }).exec()

        if (!user) {
            user = await User.create({
                email
            })
        }


        return res.json(user)
    }
}