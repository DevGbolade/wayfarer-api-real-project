import  express  from 'express';
import authMiddleware from  '../middlewares/authMiddleware';
import tripController from '../controllers/tripController';
import bodyValidation from '../middlewares/validation/bodyValidation';
import paramValidation from '../middlewares/validation/paramsValidation';


const router = express.Router();

router
  .route('/trips')
  .post([authMiddleware.authenticate, authMiddleware.isAdmin, bodyValidation], tripController.addTrip)
  .get([authMiddleware.authenticate, paramValidation, bodyValidation], tripController.getAll);


export default router;