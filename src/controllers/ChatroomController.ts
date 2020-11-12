import { Request, Response } from 'express';
import ChatroomRepository from '../repositories/ChatroomRepository';
import 'dotenv/config';

class ChatroomController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if(!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

    const chatroomExists = await ChatroomRepository.findChatroom(name);

    if(chatroomExists) throw "Chatroom with that name already exists!";

    await ChatroomRepository.createChatroom(name);

    return res.json({
      message: 'Chatroom [' + name + '] created successfully!'
    })
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const chatrooms = await ChatroomRepository.findAllChatrooms();

    return res.json(chatrooms);
  }
}

export default new ChatroomController();