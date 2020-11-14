import Message from '../models/Message';

interface IResultMessageDTO {
  message: string;
  name: string;
  userId: string;
}

class MessageRepository {

  async findMessagesByConversationId(conversationId: any): Promise<IResultMessageDTO[]> {

    const messages = await Message.find({
      conversation: conversationId
    }).populate('user').populate('conversation').exec();

    const result = await Promise.all(messages.map(async message => {
      return {
        message: message.message,
        name: message.user.name,
        userId: message.user._id,
      }
    }));

    return result;
  }

}

export default new MessageRepository();