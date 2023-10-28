import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AuthModule } from './features/auth/auth.module';
import { CompanyModule } from './features/company/company.module';
import { UserModule } from './features/user/user.module';
import databaseConfiguration, {
  DbConfig,
} from './infra/config/database.configuration';
import jwtConfiguration from './infra/config/jwt.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfiguration, jwtConfiguration],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule, AuthModule, CompanyModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DbConfig>(DbConfig.KEY);

        return {
          type: 'postgres',
          host: config.host,
          port: +config.port,
          username: config.username,
          password: config.password,
          database: config.name,
          entities,
          migrations: ['./migrations/*.ts'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
