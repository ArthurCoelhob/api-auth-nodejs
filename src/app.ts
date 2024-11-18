import express from 'express';
import sequelize from './config/database';
import authRoutes from './routes/AuthRoutes'

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const conexaoDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados com sucesso');
  } catch (error) {
    console.error('Conexão com o banco de dados com falha', error);
  }
};

app.use('/auth', authRoutes);

conexaoDatabase();

export default app;