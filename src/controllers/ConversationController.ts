import { Request, Response } from 'express';
import ConversationRepository from '../repositories/ConversationRepository';
import 'dotenv/config';

class ConversationController {
  async create(req: Request, res: Response): Promise<Response> {
    const { users } = req.body;
    
   const conversation = await ConversationRepository.createConversation(users);

    return res.json({
      message: 'Conversation created successfully!',
      conversationId: conversation._id
    })
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const chatroom = await ConversationRepository.findConversation(id);

    return res.json(chatroom);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const chatrooms = await ConversationRepository.findAllConversations(id);

    return res.json(chatrooms);
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await ConversationRepository.deleteConversationById(id);

    return res.json({
      message: 'Conversation deleted successfully!'
    });
  }
}

export default new ConversationController();