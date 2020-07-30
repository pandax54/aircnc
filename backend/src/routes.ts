import { Router, Request, Response } from 'express';
import SessionController from './controllers/SessionController';
import SpotController from './controllers/SpotController';
import DashboardController from './controllers/DashboardController';
import multer from 'multer';
import uploadConfig from './config/upload';
import BookingController from './controllers/BookingController';
import ApprovalController from './controllers/ApprovalController';
import RejectionController from './controllers/RejectionController';


const upload = multer(uploadConfig)

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
    return res.send("It's working now and refreshing")
})
// SESSIONS
routes.post('/sessions', SessionController.store);

routes.get('/dashboard', DashboardController.show);


// SPOTS
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
// o booking passará pela rota de spots -> rota encadeada
routes.post('/spots/:spot_id/booking', BookingController.store);

// ACEITAR E REJEITAR BOOKINGS
// aula 05 30:20
routes.post('/bookings/:booking_id/approve', ApprovalController.store)
routes.post('/bookings/:booking_id/rejection', RejectionController.store)


export default routes;