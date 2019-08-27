import  express  from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', authController.register);
router.post('/auth/signin', authController.login);





export default router;