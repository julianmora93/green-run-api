import { DataSource } from "typeorm";
import { DocumentEntity } from "./entities/document.entity";
import { CountryEntity } from "./entities/country.entity";
import { GenderEntity } from "./entities/genders.entity";
import { RoleEntity } from "./entities/role.entity";
import { TransactionEntity } from "./entities/transaction.entity";
import { TransactionTypeEntity } from "./entities/transaction.type.entity";
import { UserEntity } from "./entities/user.entity";
import { UserStateEntity } from "./entities/user.state.entity";
import { DbConnection } from "./configuration/db.connection";
import "reflect-metadata";
import { DocumentData } from "../data/document.data";

const _entities = [
    DocumentEntity,
    CountryEntity,
    DocumentData,
    GenderEntity,
    RoleEntity,
    TransactionEntity,
    TransactionTypeEntity,
    UserEntity,
    UserStateEntity
];

const _connect: DbConnection = new DbConnection();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: _connect.host,
    port: _connect.port,
    username: _connect.username,
    password: _connect.password,
    database: _connect.database,
    synchronize: false,
    bigNumberStrings: true,
    supportBigNumbers: true,
    logging: true,
    entities: _entities
});