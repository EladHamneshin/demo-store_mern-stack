import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './configs/db.js';
import { errorHandler, notFound } from './middlewares/errorsMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productsRoutes.js';

const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

await connectDB()

app.listen(port, () => {
    console.log(`server is runing at port ${port}`);
});