import { Request, Response, NextFunction } from "express"
import config from '../config';
import { CustomError, NotFoundError } from "../errors";
import ErrorResponse from "../interfaces/ErrorResponse";
import logger from "../lib/logger";


const errorTypes: {[key: string]: number} = {
    JsonWebTokenError: 401,
    TokenExpiredError: 401,
};

const errorMessages: {[key: string]: string} = {
    JsonWebTokenError: 'Token must provide. Please login',
    TokenExpiredError: 'Token expired',
};


export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    const error = new NotFoundError(`Not Found -> ${req.originalUrl}`);

    next(error);
}

export function errorHandler(error: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    // Custom error handle
    if(error instanceof CustomError) {
        logger.error("Custom Error: ", error);

        return res.status(error.statusCode).json({
            errors: error.serializeErrors()
        });
    }

    // Error with specific names
    if(errorTypes[error.name]) {
        logger.error("Specific Named Error: ", error);

        return res.status(errorTypes[error.name]).json({
            errors: [{message: errorMessages[error.name]}]
        });
    }

    logger.error("Something went wrong: ", error);
    res.status(400).send({
        errors: [{ 
            message: 'Something went wrong',
            stack: config.NODE_ENV !== 'production' ? error.stack : undefined
        }]
    });
}
