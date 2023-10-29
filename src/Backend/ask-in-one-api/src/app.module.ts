import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AuthModule } from './features/auth/auth.module';
import { CompanyModule } from './features/company/company.module';
import { UserModule } from './features/user/user.module';
import { DbConfig, DbConfigFactory, JwtConfigFactory } from './infra/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DbConfigFactory, JwtConfigFactory],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule, AuthModule, CompanyModule],
      useFactory: (configService: ConfigService) => {
        return DbConfig.ConfigDatabase(configService, entities);
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
