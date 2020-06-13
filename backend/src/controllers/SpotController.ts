// everything about login, registration, log out, listagem de usuarios logados
import User, { IUser } from '../models/User';
import { Request, Response } from 'express';
import Spot, { ISpot } from '../models/Spot';

// index, show, store, update, destroy
export default {
    async index(req: Request, res: Response) {
        // filtro
        const { tech } = req.query;
        var regex = new RegExp(["^", tech, "$"].join(""), "i");
        // Creates a regex of: /^SomeStringToFind$/i

        // colocar o campo que deseja procurar, busca case insensitive
        const spots = await Spot.find({ techs: regex })

        return res.json(spots);
    },
    async store(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.file);

        const { filename } = req.file;
        const { company, price, techs } = req.body

        // a info de user enviaremos pela headers - autenticacao
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            res.status(400).json({ error: "User does not exists" });
        }

        // transformar a string em array e retirar os espaços em branco antes e depois do item
        // techs: techs.split(',').map(tech => tech.trim()),

        // persistencia dos dados pra database
        const spot = await Spot.create({
            user: user_id,
            thumnail: filename,
            company,
            techs: techs.split(',').map((tech: String) => tech.trim()),
            price
        })


        // json nao é compatível com upload de files, por isso iremos utilizar o multer
        // return res.json({ message: "Spot working" })
        return res.json(spot);

    }
}