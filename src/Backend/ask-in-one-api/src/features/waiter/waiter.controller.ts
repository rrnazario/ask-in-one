import { MapPipe } from '@automapper/nestjs';
import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddWaiterCommand, AddWaiterRequest } from './waiter-add.feature';

@Controller('waiter')
export class WaiterController {
    constructor(private readonly mediator: CommandBus) { }

    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async AddAsync(@Body(MapPipe(AddWaiterRequest, AddWaiterCommand)) cmd: AddWaiterCommand)
    : Promise<any> {
        this.mediator.execute(cmd);
    }
}
