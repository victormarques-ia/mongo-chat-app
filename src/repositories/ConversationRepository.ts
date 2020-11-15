import Conversation from '../models/Conversation';
import { IUser } from 'models/User';
import MessageRepository from './MessageRepository';

interface ICreateConversationDTO {
  users: IUser[];
}

interface IResultConversationDTO extends ICreateConversationDTO{
  _id?: string;
  users: IUser[];
}

class ConversationRepository {

  async createConversation(users: ICreateConversationDTO): Promise<IResultConversationDTO> {
    
    const result = new Conversation({
      users,
    });

    await result.save();

    return result;
  }

   async findConversation(id: string): Promise<IResultConversationDTO> {
    const result = await Conversation.findOne({
      _id: id
    }).populate('users').exec();

    return result;
  }

  async findAllConversations(userId: any): Promise<IResultConversationDTO[]> {
    const result = await Conversation.find({}).populate('users').exec();

    const finalResult = result.filter((cvs) => cvs.users.some((user) => user._id == userId));

    
    return finalResult;
  }

  async deleteConversationById(id: string): Promise<void> {
    await MessageRepository.deleteMessages(id);
    await Conversation.deleteOne({
      _id: id
    });
  }

}

export default new ConversationRepository();