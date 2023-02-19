import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV ?? 'development';
import configObj from '../config/config';

const config: any = configObj[env as keyof typeof configObj];

const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  username: config.username,
  password: config.password,
  models: [__dirname + '/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
  logging: false
});

export default sequelize;
