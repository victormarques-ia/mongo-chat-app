import Message from '../models/Message';

interface IResultMessageDTO {
  message: string;
  name: string;
  userId: string;
}

class MessageRepository {

  async findMessagesByChatroomId(chatroomId: any): Promise<IResultMessageDTO[]> {

    const messages = await Message.find({
      chatroom: chatroomId
    }).populate('user').populate('chatroom').exec();

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