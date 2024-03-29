import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AuthModule } from './features/auth/auth.module';
import { CompanyModule } from './features/company/company.module';
import { UserModule } from './features/user/user.module';
import { DatabaseConfiguration, JwtConfiguration } from './infra/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfiguration.Factory, JwtConfiguration.Factory],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule, AuthModule, CompanyModule],
      useFactory: (configService: ConfigService) => DatabaseConfiguration.ConfigDatabase(configService, entities),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
