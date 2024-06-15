import bcrypt from 'bcrypt';
import * as jwtToken from '../utils/jwtUtils'; 
import config from '../config';
import typeORM from '../db/typeORM';

import { NotAuthorizedError } from "../errors";
import { User } from '../entity/User';

export default class AuthService {
    private readonly userRepo = typeORM.getRepository(User);

    constructor() {}

    async login(email: string, password: string) {
        // Find the user
        let user = await this.userRepo.findOne({
            where: {
                email
            }
        });

        // If user not found. Than create the user
        if(!user) {
            throw new NotAuthorizedError("Invalid Credentials")
        }

        const check = await bcrypt.compare(password, user.password);
        if(!check) {
            throw new NotAuthorizedError("Invalid Credentials")
        }

        // Generate Session 
        const payload = {
            userId: user.id,
            role: user.role,
        };

        const token = await jwtToken.signToken(payload, config.TOKEN_TIMEOUT);

        return {
            token,
            expireTime: config.TOKEN_TIMEOUT
        }
    }
}
