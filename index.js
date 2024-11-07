import dotenv from 'dotenv';
import express, { json } from 'express';
import { connect } from 'mongoose';
import UserRoutes from './src/user/infrastructure/routes/UserRoutes.js';
import AuthRoutes from './src/auth/infrastructure/routes/AuthRoutes.js';

dotenv.config();
connect(process.env.MONGODB_URI);

const app = express();
app.use(json());

app.use('/users', UserRoutes); 
app.use('/auth', AuthRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
