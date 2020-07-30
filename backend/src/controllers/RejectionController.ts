// everything about login, registration, log out, listagem de usuarios logados
import { Request, Response } from 'express';


export default {
    async store(req: Request, res: Response) {
        const { booking_id } = req.params;
        const booking = await Booking.findById(booking_id).populate('spot');
        booking.approved = false;

        await booking.save();

        // pegar o user id do usuário que criou o spot
        // aula 05 41:00
        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            // se o criador do spot estiver logado receberá uma mensagem de confirmação de reserva
            req.io.to(bookingUserSocket).emit('booking_response', booking)
        }
    }
}