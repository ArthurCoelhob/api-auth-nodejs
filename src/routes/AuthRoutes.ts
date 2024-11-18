import { Router } from 'express';
import { novoOperador, login } from '../controllers/AuthController'; 
import { tokenAuth } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/novoOperador', novoOperador);


router.post('/login', login);

router.get('/protegida', tokenAuth, (req, res) => {
    res.json({ message: 'Essa rota é protegida', user: (req as any).user });
  });

export default router;