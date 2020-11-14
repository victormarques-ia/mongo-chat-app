import { Request, Response } from 'express';
import MessageRepository from '../repositories/MessageRepository';

import 'dotenv/config';

class MessageController {

  async find(req: Request, res: Response): Promise<Response> {
    const { conversationId } = req.params;
    const messages = await MessageRepository.findMessagesByConversationId(conversationId);

    return res.json(messages);
  }
}

export default new MessageController();