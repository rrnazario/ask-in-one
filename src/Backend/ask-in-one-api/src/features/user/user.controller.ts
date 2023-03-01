import { MapPipe } from '@automapper/nestjs';
import { Body, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserType } from 'src/entities/user.entity';
import { JwtAuthGuard, AllowedFor } from '../auth/do-login';
import { AddUserCommand, AddUserRequest } from './user-add';

@Controller('user')
export class UserController {
    constructor(private readonly mediator: CommandBus) { }

    @UseGuards(JwtAuthGuard)
    @AllowedFor(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()    
    @HttpCode(201)
    async AddAsync(@Body(MapPipe(AddUserRequest, AddUserCommand)) cmd: AddUserCommand)
    : Promise<any> {
        this.mediator.execute(cmd);
    }
}
