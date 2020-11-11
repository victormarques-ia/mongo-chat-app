import Chatroom from '../models/Chatroom';

interface ICreateChatroomDTO {
  name: string;
}

interface IResultChatroomDTO extends ICreateChatroomDTO{
  id?: string;
}

class ChatroomRepository {

  async createChatroom(name: ICreateChatroomDTO): Promise<IResultChatroomDTO> {
    
    const result = new Chatroom({
      name,
    });

    await result.save();

    return result;
  }

  async findChatroom(name: string): Promise<IResultChatroomDTO> {
    const result = Chatroom.findOne({
      name
    });

    return result;
  }

}

export default new ChatroomRepository();