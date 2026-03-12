import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string || 'personal-data-sequelizeBootstrap',
    (process.env.DB_USER as string || 'postgres'),
    (process.env.DB_PASS as string || 'Ivan1234'),
    {
        host: (process.env.DB_HOST || 'localhost'),
        dialect: 'postgres',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        logging: false
    }
);

export default sequelize; // Cast to Sequelize type for compatibility

