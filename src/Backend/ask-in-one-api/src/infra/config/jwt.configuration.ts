import { ConfigService, registerAs } from '@nestjs/config';

export abstract class JwtConfig {
    public secret: string;

    static KEY = 'jwt';

    static FromService(configService: ConfigService): JwtConfig {
        return configService.get<JwtConfig>(JwtConfig.KEY)
    }
}

export const JwtConfigFactory = registerAs(
    JwtConfig.KEY,
    (): JwtConfig => ({
        secret: process.env.SECRET,
    }),
);
