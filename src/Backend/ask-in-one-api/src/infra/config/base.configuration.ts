import { ConfigFactoryKeyHost, ConfigService } from "@nestjs/config";

export interface IBaseConfiguration<T> {
    Factory: (() => T) & ConfigFactoryKeyHost<T>;
    FromService(configService: ConfigService): T;
}