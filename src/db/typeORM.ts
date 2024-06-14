import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "../entity/Employee"
import { User } from "../entity/User"
import config from "../config"

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.POSTGRESQL_URL,
    port: 5432,
    username: config.POSTGRESQL_USER,
    password: config.POSTGRESQL_PASSWORD,
    database: config.POSTGRESQL_DB,
    synchronize: true,
    logging: false,
    entities: [User, Employee],
    migrations: [],
    subscribers: [],
})

export default AppDataSource;
