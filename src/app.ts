import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import config from './config';

// Middlewares
import {notFoundHandler, errorHandler} from './middleware/errorHandler';
import apis from './apis';
import logger from './lib/logger';

// Create express App
const app = express();

// Setup cors
app.use(cors({
    origin: [
        /^https?:\/\/localhost(:[0-9]+)?(\/.*)?$/,          // localhost:anyport/path
        config.CLIENT_URL
    ],
    credentials: true
}));


// Setup express middlewares'
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: false, limit: "50mb"}));

// Setup Middleware
app.use(compression());
app.use(helmet());

// Logger middleware
app.use((req, res, next) => {
    logger.info(`${req.method} - ${req.originalUrl}`);
    next();
});

// Main Routes
app.use(`/api/v1`, apis);


// Not Found and Error handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
