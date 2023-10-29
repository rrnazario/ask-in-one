import { ConfigFactoryKeyHost, ConfigService } from "@nestjs/config";

export interface IBaseOptions { }

export interface IBaseConfiguration<T extends IBaseOptions> {
    Factory: (() => T) & ConfigFactoryKeyHost<T>;
    FromService(configService: ConfigService): T;
}

export function fromService<T extends IBaseOptions>(path: string, configService: ConfigService): T {
    return configService.get<T>(path);
};