import { ConfigService, registerAs } from '@nestjs/config';
import { IBaseOptions, IBaseConfiguration, fromService } from './base.configuration';

export abstract class JwtConfigOptions implements IBaseOptions {
    public secret: string;
}

const PROPERTY_PATH = 'jwt';

interface IJwtConfiguration extends IBaseConfiguration<JwtConfigOptions> { }

const factory = registerAs(
    PROPERTY_PATH,
    (): JwtConfigOptions => ({
        secret: process.env.SECRET,
    }),
);

export const JwtConfiguration: IJwtConfiguration =
{
    Factory: factory,
    FromService: (config: ConfigService) => fromService<JwtConfigOptions>(PROPERTY_PATH, config),
}