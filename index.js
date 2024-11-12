import dotenv from 'dotenv';
import express, { json } from 'express';
import connectToDatabase from './src/config/mongodb.js';
import UserRoutes from './src/user/infrastructure/routes/UserRoutes.js';
import AuthRoutes from './src/auth/infrastructure/routes/AuthRoutes.js';

dotenv.config();

connectToDatabase();

const app = express();
app.use(json());

app.use('/users', UserRoutes);
app.use('/auth', AuthRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
