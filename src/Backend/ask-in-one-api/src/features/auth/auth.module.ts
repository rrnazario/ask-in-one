import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthProfile } from './auth.profile';
import { DoLoginCommandHandler, LocalAuthGuard, LocalStrategy, UserValidator } from './do-login';

const handlers = [
    DoLoginCommandHandler,
]

const DoLoginProviders = [
    UserValidator,
    LocalStrategy,
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
                    signOptions: { expiresIn: '180d' },
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
        //JwtService,
        ...DoLoginProviders
    ],
})
export class AuthModule { }