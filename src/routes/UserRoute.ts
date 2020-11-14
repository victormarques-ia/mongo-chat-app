import { Router } from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import UserController from '../controllers/UserController';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/login', catchErrors(UserController.login));

router.post('/register', catchErrors(UserController.register));

router.get('/', auth, catchErrors(UserController.findAll));

export default router;