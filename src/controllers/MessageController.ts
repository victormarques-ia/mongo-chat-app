import { Request, Response } from 'express';
import MessageRepository from '../repositories/MessageRepository';

import 'dotenv/config';

class MessageController {

  async find(req: Request, res: Response): Promise<Response> {
    const { chatroomId } = req.params;
    const messages = await MessageRepository.findMessagesByChatroomId(chatroomId);

    return res.json(messages);
  }
}

export default new MessageController();