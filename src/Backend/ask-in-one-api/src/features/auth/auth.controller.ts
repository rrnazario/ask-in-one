import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Post, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DoLoginCommand, DoLoginRequest } from './do-login';
import { LocalAuthGuard } from 'src/validations';

@Controller('auth')
export class AuthController {
    constructor(private readonly mediator: CommandBus,
        @InjectMapper() private readonly mapper: Mapper) { }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(LocalAuthGuard)
    async AddAsync(@Body() req: DoLoginRequest)
    : Promise<any> {
        const cmd = this.mapper.map(req, DoLoginRequest, DoLoginCommand);

        const token = await this.mediator.execute(cmd);
        if (!token) throw new UnauthorizedException();
        return token;
    }    
}