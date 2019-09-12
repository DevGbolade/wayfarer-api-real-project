import  express  from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';
import bodyValidation from '../middlewares/validation/bodyValidation';

const router = express.Router();

router.post('/auth/signup', [bodyValidation], authController.signup);
router.post('/auth/signin', [bodyValidation], authController.signin);


export default router;