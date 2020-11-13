import { Router } from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import MessageController from '../controllers/MessageController';

import { auth } from '../middlewares/auth';

const router = Router();

router.get('/:chatroomId', auth, catchErrors(MessageController.find));


export default router;