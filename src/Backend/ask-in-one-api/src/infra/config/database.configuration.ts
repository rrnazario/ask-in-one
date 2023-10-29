import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IBaseConfiguration, IBaseOptions, fromService } from './base.configuration';

export abstract class DbConfigOptions implements IBaseOptions {
    public host: string;
    public port: number;
    public name: string;
    public username: string;
    public password: string;
}

const PROPERTY_PATH = 'database';

const factory = registerAs(
    PROPERTY_PATH,
    (): DbConfigOptions => ({
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) ?? 7777,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }),
);

interface IDatabaseConfiguration extends IBaseConfiguration<DbConfigOptions> {
    ConfigDatabase(configService: ConfigService, entities: any[]): TypeOrmModuleOptions;
}

export const DatabaseConfiguration: IDatabaseConfiguration =
{
    Factory: factory,
    FromService: (config: ConfigService) => fromService<DbConfigOptions>(PROPERTY_PATH, config),
    ConfigDatabase: (configService: ConfigService, entities: any[]) => {
        const config = fromService<DbConfigOptions>(PROPERTY_PATH, configService);

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
