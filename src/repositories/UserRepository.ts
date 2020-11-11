import User from '../models/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IResultUserDTO extends ICreateUserDTO{
  id?: string;
}

class UserRepository {

  async registerUser({name, email, password }: ICreateUserDTO): Promise<IResultUserDTO> {
    
    const result = new User({
      name,
      email,
      password
    });

    await result.save();

    return result;
  }

  async loginUser(email: string, password: string): Promise<IResultUserDTO> {
    const result = User.findOne({
      email,
      password
    });

    return result;
  }

  async findUser(email: string): Promise<IResultUserDTO> {
    const result = User.findOne({
      email
    });

    return result;
  }

}

export default new UserRepository();