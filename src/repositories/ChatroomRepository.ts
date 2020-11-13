import Chatroom from '../models/Chatroom';

interface ICreateChatroomDTO {
  name: string;
}

interface IResultChatroomDTO extends ICreateChatroomDTO{
  _id?: string;
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

  async findAllChatrooms(): Promise<IResultChatroomDTO[]> {
    const result = Chatroom.find({});

    return result;
  }

  async deleteChatroomById(id: string): Promise<void> {
    await Chatroom.deleteOne({
      _id: id
    });
  }

}

export default new ChatroomRepository();