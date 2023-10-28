import { registerAs } from "@nestjs/config"

export abstract class DbConfig {
    public host: string;
    public port: number;
    public name: string;
    public username: string;
    public password: string;

    public static KEY: string = 'database';
}

export default registerAs(DbConfig.KEY, (): DbConfig => ({
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) ?? 7777,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

}));