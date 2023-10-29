import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IBaseConfiguration } from './base.configuration';

export abstract class DbConfigOptions {
    public host: string;
    public port: number;
    public name: string;
    public username: string;
    public password: string;

    static KEY = 'database';
}

const factory = registerAs(
    DbConfigOptions.KEY,
    (): DbConfigOptions => ({
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) ?? 7777,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }),
);

const fromService = (configService: ConfigService): DbConfigOptions => configService.get<DbConfigOptions>(DbConfigOptions.KEY);

interface IDatabaseConfiguration extends IBaseConfiguration<DbConfigOptions> {
    ConfigDatabase(configService: ConfigService, entities: any[]): TypeOrmModuleOptions;
}

export const DatabaseConfiguration: IDatabaseConfiguration =
{
    Factory: factory,
    FromService: fromService,
    ConfigDatabase: (configService: ConfigService, entities: any[]) => {
        const config = fromService(configService);

        return {
            type: 'postgres',
            host: config.host,
            port: +config.port,
            username: config.username,
            password: config.password,
            database: config.name,
            entities,
            migrations: ['./migrations/*.ts'],
        };
    }
}
