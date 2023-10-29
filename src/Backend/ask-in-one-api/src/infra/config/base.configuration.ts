import { ConfigFactoryKeyHost, ConfigService } from "@nestjs/config";

export interface IBaseOptions { }

export interface IBaseConfiguration<T extends IBaseOptions> {
    Factory: (() => T) & ConfigFactoryKeyHost<T>;
    FromService(configService: ConfigService): T;
}

export abstract class BaseConfiguration<T> implements IBaseConfiguration<T> {
    protected key: string;

    constructor(path: string) {
        this.key = path
    }
    
    abstract Factory: (() => T) & ConfigFactoryKeyHost<T>;

    FromService(configService: ConfigService<Record<string, unknown>, false>): T {
        return configService.get<T>(this.key);
    }
}