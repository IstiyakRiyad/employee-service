import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "../entity/Employee"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "example",
    database: "employee",
    synchronize: true,
    logging: false,
    entities: [User, Employee],
    migrations: [],
    subscribers: [],
})
