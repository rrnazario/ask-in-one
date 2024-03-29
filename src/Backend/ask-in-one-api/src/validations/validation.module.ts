import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/features/user/user.module';
import { JwtConfiguration } from 'src/infra/config';
import { LocalStrategy, JwtStrategy, UserValidator } from 'src/validations';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [JwtConfiguration.Factory] }),
        TypeOrmModule.forFeature([User, Company]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config = JwtConfiguration.FromService(configService);

                return {
                    secret: config.secret,
                    signOptions: { expiresIn: '7d' },
                };
            },
        }),
        PassportModule,
        UserModule,
    ],
    providers: [LocalStrategy, JwtStrategy, UserValidator, ConfigService],
})
export class ValidationModule { }
