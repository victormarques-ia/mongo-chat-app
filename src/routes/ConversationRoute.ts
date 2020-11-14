import { Router } from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import ConversationController from '../controllers/ConversationController';

import { auth } from '../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(auth, catchErrors(ConversationController.create))

router
  .route('/:id')
  .get(auth, catchErrors(ConversationController.findAll))
  .get(auth, catchErrors(ConversationController.findById))
  .delete(auth, catchErrors(ConversationController.deleteById))



export default router;