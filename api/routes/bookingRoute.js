import { Router } from 'express';

import bookingController from '../controllers/bookingController';
import auth from '../middlewares/authMiddleware';
import bodyValidation from '../middlewares/validation/bodyValidation';

const router = Router();

router
  .route('/bookings')
  .post(
    [auth.authenticate, bodyValidation],
    bookingController.addBooking,
  )
  .get(
    [auth.authenticate],
    bookingController.getAll,
  );

export default router;
