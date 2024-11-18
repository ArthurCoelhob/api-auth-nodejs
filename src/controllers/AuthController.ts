import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Operador from '../models/userModel';
import jwt from 'jsonwebtoken';

export const novoOperador = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { operador, senha } = req.body;

    const existeOperador = await Operador.findOne({ where: { username: operador } });
    if (existeOperador) {
       res.status(400).json({ message: 'Operador já existe' });
       return;
    }
    const senhaCript = await bcrypt.hash(senha, 10);

    const operadorCriado = await Operador.create({ username: operador, password: senhaCript });

    res.status(201).json({ message: 'Operador criado', operadorCriado });
    return;
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { operador, senha } = req.body;
  
      const operadorExistente = await Operador.findOne({ where: { username: operador } });
      if (!operadorExistente) {
         res.status(404).json({ message: 'Operador não existe' });
         return
      }
  
      const senhaValida = await bcrypt.compare(senha, operadorExistente.password);
      if (!senhaValida) {
        res.status(401).json({ message: 'Senha invalida' });
        return 
      }

      const token = jwt.sign(
        { id: operadorExistente.id, username: operadorExistente.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Login com sucesso', token });
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ message: 'Erro ao realizar o login', error });
    }
  };
