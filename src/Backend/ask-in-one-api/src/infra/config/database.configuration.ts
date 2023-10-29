import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseConfiguration, IBaseConfiguration, IBaseOptions } from './base.configuration';

export abstract class DbConfigOptions implements IBaseOptions {
    public host: string;
    public port: number;
    public name: string;
    public username: string;
    public password: string;
}

const PROPERTY_PATH = 'database';

interface IDatabaseConfiguration extends IBaseConfiguration<DbConfigOptions> {
    ConfigDatabase(configService: ConfigService, entities: any[]): TypeOrmModuleOptions;
}

class CDatabaseConfiguration extends BaseConfiguration<DbConfigOptions> implements IDatabaseConfiguration {
    constructor() {
        super(PROPERTY_PATH);
    }

    ConfigDatabase(configService: ConfigService, entities: any[]): TypeOrmModuleOptions {
        const config = this.FromService(configService);

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

    Factory = registerAs(
        this.key,
        (): DbConfigOptions => ({
            name: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) ?? 7777,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        }),
    )
}

export const DatabaseConfiguration = new CDatabaseConfiguration();