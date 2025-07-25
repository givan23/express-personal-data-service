import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        logging: false
    }
);

export default sequelize; // Cast to Sequelize type for compatibility

