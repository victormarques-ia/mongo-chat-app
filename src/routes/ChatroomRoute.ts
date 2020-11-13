import { Router } from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import ChatroomController from '../controllers/ChatroomController';

import { auth } from '../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(auth, catchErrors(ChatroomController.create))
  .get(auth, catchErrors(ChatroomController.findAll));

router
  .route('/:id')
  .delete(auth, catchErrors(ChatroomController.deleteById))


export default router;