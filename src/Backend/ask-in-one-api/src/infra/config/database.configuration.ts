import { ConfigService, registerAs } from '@nestjs/config';

export class DbConfigOptions {
    public host: string;
    public port: number;
    public name: string;
    public username: string;
    public password: string;

    public static KEY = 'database';

    static FromService(configService: ConfigService): DbConfigOptions {
        return configService.get<DbConfigOptions>(DbConfigOptions.KEY)
    }
}

export default registerAs(
    DbConfigOptions.KEY,
    (): DbConfigOptions => ({
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) ?? 7777,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }),
);
