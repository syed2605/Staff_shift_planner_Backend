import express, { Request, Response, NextFunction } from "express";
import cors from "./config/cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import logger from './config/logger';
import limiter from './config/rateLimitter';
import staffRoutes from './route/staff.routes';

  const app = express();

  app.use(cors);
  app.use(express.json());
  app.use(cookieParser());
  app.use((req: Request, res: Response, next: NextFunction) => {
      logger.info(`Incoming ${req.method} request to ${req.url}`);
      next();
    });
  app.use(limiter);
  app.use(helmet());

  app.get('/', (req: Request, res: Response) => {
      res.send(`Server running on http://localhost:3000`);
  });

  app.use('/api/staff', staffRoutes);


  export default app;
