import express from 'express';
import sequelize from './config/database';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const conexaoDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão deu bom');
  } catch (error) {
    console.error('Conexão deu ruim', error);
  }
};

conexaoDatabase();

export default app;