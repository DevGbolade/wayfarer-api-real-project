import { Router } from 'express';

import busController from '../controllers/busController';
import auth from '../middlewares/authMiddleware';
import bodyValidation from '../middlewares/validation/bodyValidation';
import paramValidation from '../middlewares/validation/paramsValidation';

const router = Router();

router
  .route('/buses')
  .post(
    [auth.authenticate, auth.isAdmin, bodyValidation],
    busControllerl.addBus,
  )
  .get('/buses', [auth.authenticate], busController.getAll);

router
.get('/buses/:bus_id', [auth.authenticate, paramValidation], busController.getOne);

export default router;
