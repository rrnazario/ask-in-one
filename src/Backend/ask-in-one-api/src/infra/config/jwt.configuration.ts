import { registerAs } from '@nestjs/config';
import { IBaseOptions, BaseConfiguration } from './base.configuration';

export abstract class JwtConfigOptions implements IBaseOptions {
    public secret: string;
}

class CJwtConfiguration extends BaseConfiguration<JwtConfigOptions> {
    constructor() {
        super('jwt');
    }
    
    Factory = registerAs(
        this.key,
        (): JwtConfigOptions => ({
            secret: process.env.SECRET,
        }),
    );
}

export const JwtConfiguration = new CJwtConfiguration();