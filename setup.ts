import bcrypt from 'bcrypt';
import config from './src/config';
import logger from './src/lib/logger';
import typeORM from './src/db/typeORM';
import { Role } from './src/constants/Roles';
import { User } from './src/entity/User';



async function setup() {
    try {
        await typeORM.initialize();

        const userRepo = typeORM.getRepository(User);

        await userRepo.createQueryBuilder()
                .delete()
                .where("role = :role",{role:  Role.ADMIN})
                .execute();

        logger.info(`All admin user has been deleted.`);

        const password = bcrypt.hashSync(config.ADMIN_PASSWORD, 12)

        await userRepo.upsert(
            [{name: config.ADMIN_NAME, email: config.ADMIN_EMAIL, role: Role.ADMIN, password}],
            ["email"]
        );

        logger.info(`Admin user is created.`);

        await typeORM.destroy();
    }
    catch(error) {
        console.log(error);
        await typeORM.destroy();
    }
}

setup().then();

