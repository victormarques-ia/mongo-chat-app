import { Router } from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/login', catchErrors(UserController.login));

router.post('/register', catchErrors(UserController.register));

export default router;