import express from 'express';
import sequelizeBootstrap from './database/sequelize.bootstrap';
import userRoutes from './modules/user/user.routes';
import errorHandler from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const isDevelopment = process.env.NODE_ENV === 'development';

if (sequelizeBootstrap.sequelize) {
    if (isDevelopment) {
        sequelizeBootstrap.sequelize.sync({alter: true})
            .then(() => {
                console.log('DB synced with alter=true (development only)');
            })
            .catch((err: unknown) => {
                console.error('DB sync error:', err);
            });
    } else {
        sequelizeBootstrap.sequelize.authenticate()
            .then(() => {
                console.log('DB connection verified');
            })
            .catch((err: unknown) => {
                console.error('DB connection error:', err);
            });
    }
} else {
    console.error('Sequelize non inizializzato');
}

app.use(errorHandler);

export default app;
