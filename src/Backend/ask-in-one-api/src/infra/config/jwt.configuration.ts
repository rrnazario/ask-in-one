import { ConfigService, registerAs } from '@nestjs/config';
import { IBaseConfiguration } from './base.configuration';

export abstract class JwtConfigOptions {
    public secret: string;

    static KEY = 'jwt';
}

interface IJwtConfiguration extends IBaseConfiguration<JwtConfigOptions> { }

const factory = registerAs(
    JwtConfigOptions.KEY,
    (): JwtConfigOptions => ({
        secret: process.env.SECRET,
    }),
);

export const JwtConfiguration: IJwtConfiguration =
{
    Factory: factory,
    FromService: (configService: ConfigService): JwtConfigOptions => configService.get<JwtConfigOptions>(JwtConfigOptions.KEY),   
}