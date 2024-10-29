import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

function getVariavelEnv(nome: string): string {
  const variavelAmbiente = process.env[nome];
  if (!variavelAmbiente) {
    throw new Error(`A variável de ambiente ${nome} não está definida`);
  }
  return variavelAmbiente;
}

const sequelize = new Sequelize(
  getVariavelEnv('DB_NAME'),
  getVariavelEnv('DB_USER'),
  getVariavelEnv('DB_PASS'),
  {
    host: getVariavelEnv('DB_HOST'),
    dialect: 'postgres',
  }
);

export default sequelize;