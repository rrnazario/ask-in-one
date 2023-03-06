import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { ValidationModule } from 'src/validations';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthProfile } from './auth.profile';
import { DoLoginCommandHandler } from './do-login';


const handlers = [
    DoLoginCommandHandler,
]

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Company,]),
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
        UserModule,
        ValidationModule
    ],
    controllers: [AuthController],
    providers: [
        ...handlers,
        AuthProfile
    ],
})
export class AuthModule { }