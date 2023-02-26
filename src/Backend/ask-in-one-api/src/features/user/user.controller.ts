import { MapPipe } from '@automapper/nestjs';
import { Body, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/do-login';
import { AddUserCommand, AddUserRequest } from './user-add';

@Controller('user')
export class UserController {
    constructor(private readonly mediator: CommandBus) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async AddAsync(@Body(MapPipe(AddUserRequest, AddUserCommand)) cmd: AddUserCommand)
    : Promise<any> {
        this.mediator.execute(cmd);
    }
}
