import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/features/user/user.module';
import { LocalStrategy, JwtStrategy, UserValidator } from 'src/validations';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Company,]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('SECRET'),
                    signOptions: { expiresIn: '7d' },
                }
            }
        }),
        PassportModule,
        UserModule
    ],
    providers: [
        LocalStrategy,
        JwtStrategy,
        UserValidator
    ],
})
export class ValidationModule { }