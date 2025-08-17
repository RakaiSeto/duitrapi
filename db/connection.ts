import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('duitrapi', process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST!,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT!, 10),
});

export default sequelize;