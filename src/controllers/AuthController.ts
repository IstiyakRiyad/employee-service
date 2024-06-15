import { Request, Response, NextFunction } from "express"
import AuthService from "../services/AuthService";

// Interfaces
import SuccessResponse from "../interfaces/SuccessResponse";
import { AuthLogin } from "../validators/Auth";

const authService = new AuthService();

export class AuthController {

    constructor() {}

    static async login(req: Request<{}, {}, AuthLogin>, res: Response<SuccessResponse>, next: NextFunction) {
        try {
            const { email, password } = req.body;

            // Generate Session 
            const tokenInfo = await authService.login(email, password);

            res.json({
                message: "LogIn Successfully",
                data: {
                    tokenType: 'Bearer',
                    token: tokenInfo.token,
                    expireTime: tokenInfo.expireTime,
                }
            });
        }
        catch(error) {
            next(error);
        }
    }
}
