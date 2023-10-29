import { ConfigService, registerAs } from '@nestjs/config';

export abstract class JwtConfigOptions {
    public secret: string;

    static KEY = 'jwt';

    static FromService(configService: ConfigService): JwtConfigOptions {
        return configService.get<JwtConfigOptions>(JwtConfigOptions.KEY)
    }
}

export const JwtConfig = registerAs(
    JwtConfigOptions.KEY,
    (): JwtConfigOptions => ({
        secret: process.env.SECRET,
    }),
);
