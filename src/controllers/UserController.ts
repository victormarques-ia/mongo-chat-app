import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

    if(!emailRegex.test(email)) throw "Email is not supported from your domain.";

    if(password.length < 6) throw "Password must be atleast 6 characters long.";

    const userExists = await UserRepository.findUser(email);

    if(userExists) throw "User with same email already exists";

    const user = await UserRepository.registerUser({ name, email, password: sha256(password + process.env.SALT) });

    return res.json({
      message: "User [" + name + "] registered successfully!",
      user
    });
  }

  async login(req: Request, res: Response) {
    let { email, password } = req.body;

    password = sha256(password + process.env.SALT);

    const user = await UserRepository.loginUser(email, password);

    if (!user) throw "Email and Password did not match.";

    const token = jwt.sign({ id: user.id }, process.env.SECRET);

    return res.json({
      message: 'User logged in successfully!',
      token
    });
  }
}

export default new UserController();