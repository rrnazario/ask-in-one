import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthProfile } from './auth.profile';
import { DoLoginCommandHandler, JwtStrategy } from './do-login';
import { UserValidator, LocalStrategy, LocalAuthGuard } from './validations';

const handlers = [
    DoLoginCommandHandler,
]

const DoLoginProviders = [
    UserValidator,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
]

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CqrsModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('SECRET'),
                    signOptions: { expiresIn: '7d' },
                }
            }
        }),
        PassportModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [
        ...handlers,
        AuthProfile,
        ...DoLoginProviders
    ],
})
export class AuthModule { }