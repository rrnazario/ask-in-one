import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AuthModule } from './features/auth/auth.module';
import { CompanyModule } from './features/company/company.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
  }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        UserModule,
        AuthModule,
        CompanyModule,
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities,
        migrations: ['./migrations/*.ts'],
        //synchronize: true
      }),        
      inject: [ConfigService],
    })
  ],
})
export class AppModule {}
