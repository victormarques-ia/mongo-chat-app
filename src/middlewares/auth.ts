import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({
      message: 'Token not provided'
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = jwt.verify(token, process.env.SECRET);

    req.payload = payload;

    return next();
  } catch(error) {
    return response.status(401).json({
      message: 'Token incorrect',
    });
  }
}