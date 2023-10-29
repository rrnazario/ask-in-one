import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export abstract class DbConfig {
    public host: string;
    public port: number;
    public name: string;
    public username: string;
    public password: string;

    public static KEY = 'database';

    static FromService(configService: ConfigService): DbConfig {
        return configService.get<DbConfig>(DbConfig.KEY)
    }

    static ConfigDatabase = (configService: ConfigService, entities: any[]): TypeOrmModuleOptions => {
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
}

export const DbConfigFactory = registerAs(
    DbConfig.KEY,
    (): DbConfig => ({
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) ?? 7777,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }),
);
