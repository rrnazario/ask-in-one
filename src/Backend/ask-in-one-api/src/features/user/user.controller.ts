import { MapPipe } from '@automapper/nestjs';
import { Body, Controller, HttpCode, Post, Get, UseGuards, UsePipes, ValidationPipe, HttpStatus, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserType } from 'src/entities/user.entity';
import { JwtAuthGuard, AllowedFor } from '../auth/do-login';
import { GetAllUsersQuery } from './get-all-users';
import { AddUserCommand, AddUserRequest } from './user-add';

@Controller('user')
export class UserController {
    constructor(private readonly commandMediator: CommandBus,
        private readonly queryMediator: QueryBus) { }

    @UseGuards(JwtAuthGuard)
    @AllowedFor(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async AddAsync(@Body(MapPipe(AddUserRequest, AddUserCommand)) cmd: AddUserCommand)
        : Promise<any> {
        this.commandMediator.execute(cmd);
    }

    @AllowedFor(UserType.Admin)
    @Get()
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.NO_CONTENT)
    async GetAllAsync(): Promise<any> {
        const result = this.queryMediator.execute(new GetAllUsersQuery());

        return result;
    }
}
