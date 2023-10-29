import { registerAs } from '@nestjs/config';
import { IBaseOptions, BaseConfiguration } from './base.configuration';

export abstract class JwtConfigOptions implements IBaseOptions {
    public secret: string;
}

const PROPERTY_PATH = 'jwt';

class CJwtConfiguration extends BaseConfiguration<JwtConfigOptions> {
    constructor() {
        super(PROPERTY_PATH);
    }
    
    Factory = registerAs(
        this.key,
        (): JwtConfigOptions => ({
            secret: process.env.SECRET,
        }),
    );
}

export const JwtConfiguration = new CJwtConfiguration();