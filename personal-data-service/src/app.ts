import express from 'express';
import db from './models/index.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
if (db.sequelize) {

    db.sequelize.sync({alter: true}).then(() => {
        console.log('DB synced');
    });
} else {
    console.error('Sequelize non inizializzato');
}

app.use(errorHandler);

export default app;
