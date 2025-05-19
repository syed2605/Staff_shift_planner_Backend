import express from "express";
import cors from "./config/cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import logger from './config/logger';
import limiter from './config/rateLimitter';
const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());

export default app;
