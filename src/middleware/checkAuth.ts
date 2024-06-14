import { Request, Response, NextFunction } from "express"
import { NotAuthorizedError, ForbiddenError } from "../errors";
import { verifyToken } from '../utils/jwtUtils';
import { RoleValues } from '../constants/Roles';

interface UserPayload {
    userId: string;
    role: RoleValues;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}



export const checkAuth = (roles?: RoleValues[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers;

            if(!authorization) {
                if(roles?.length) throw new NotAuthorizedError('Authorization code required');
                return next();
            }

            const token = authorization.split(' ');

            // Cut the bearer token and find the token portion
            if (token[0] !== 'Bearer') throw new NotAuthorizedError('Bearer Token is required');

            // Verify and find the user id
            const { userId, role } = await verifyToken(token[1]);


            req.user = { userId, role };

            if(!roles?.length) return next();

            let i;
            for (i = 0; i < roles.length; i++)
                if (roles[i] === role) break;

            if (i === roles.length) throw new ForbiddenError('You are not authorized');

            return next();
        }
        catch (error) {
            next(error);
        }
    }
}
