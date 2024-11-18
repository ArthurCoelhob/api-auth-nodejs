import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const tokenAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não existe' });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
   
    (req as any).user = decode;

    next();
  } catch (error) {
    res.status(403).json({ message: 'Token invalido ou expirado' });
  }
};
