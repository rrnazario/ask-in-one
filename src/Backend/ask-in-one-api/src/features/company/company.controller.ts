import { MapPipe } from '@automapper/nestjs';
import { Body, Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { AddCompanyCommand, AddCompanyRequest } from './add-company';

@Controller('company')
export class CompanyController {
    constructor(private readonly mediator: CommandBus) { }

    @Put()
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async AddAsync(@Body(MapPipe(AddCompanyRequest, AddCompanyCommand)) cmd: AddCompanyCommand)
    : Promise<any> {
        return await this.mediator.execute(cmd);
    }
}
