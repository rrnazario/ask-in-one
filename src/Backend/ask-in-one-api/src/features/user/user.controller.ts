import { MapPipe } from '@automapper/nestjs';
import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddUserCommand, AddUserRequest } from './user-add.feature';

@Controller('user')
export class UserController {
    constructor(private readonly mediator: CommandBus) { }

    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async AddAsync(@Body(MapPipe(AddUserRequest, AddUserCommand)) cmd: AddUserCommand)
    : Promise<any> {
        this.mediator.execute(cmd);
    }
}
