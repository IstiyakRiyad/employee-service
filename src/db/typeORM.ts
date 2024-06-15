import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "../config"
import { User } from "../entity/User";
import { Employee } from "../entity/Employee";
import { Initial1718462056374 } from "./migrations/1718462056374-initial";

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.POSTGRESQL_URL,
    port: 5432,
    username: config.POSTGRESQL_USER,
    password: config.POSTGRESQL_PASSWORD,
    database: config.POSTGRESQL_DB,
    synchronize: false,
    logging: false,
    entities: [
        User, Employee
    ],
    migrations: [
        Initial1718462056374
    ],
    subscribers: [],
})

export default AppDataSource;
