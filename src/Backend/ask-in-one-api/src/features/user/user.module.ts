import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AddUserCommandHandler } from './user-add';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';

const handlers = [
    AddUserCommandHandler
]

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CqrsModule,        
    ],
    controllers: [UserController],
    providers: [
        ...handlers,
        UserProfile
    ],
})
export class UserModule { }