import {Request, Response, NextFunction } from "express";
import RequestValidator from "../interfaces/RequestValidator";
import {RequestValidationError} from '../errors';
import { ZodError } from "zod";


export function requestValidator(validators: RequestValidator) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if(validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if(validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            next();
        }
        catch(error) {
            if(error instanceof ZodError) {
                next(new RequestValidationError(error));
            }
        }
    }
}