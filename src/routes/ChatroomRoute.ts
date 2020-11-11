import { Router } from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import ChatroomController from '../controllers/ChatroomController';

import { auth } from '../middlewares/auth';

const router = Router();

router.post('/', auth, catchErrors(ChatroomController.create));


export default router;