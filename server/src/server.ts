import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is runing at port ${port}`);
});