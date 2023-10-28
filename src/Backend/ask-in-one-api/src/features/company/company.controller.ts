import { MapPipe } from '@automapper/nestjs';
import {
  Body,
  Controller,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { UserType } from 'src/entities/user.entity';
import { AllowedFor, JwtAuthGuard } from 'src/validations';
import { AddCompanyCommand, AddCompanyRequest } from './add-company';

@Controller('company')
@AllowedFor(UserType.Admin)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class CompanyController {
  constructor(private readonly mediator: CommandBus) {}

  @Put()
  @HttpCode(201)
  async AddAsync(
    @Body(MapPipe(AddCompanyRequest, AddCompanyCommand)) cmd: AddCompanyCommand,
  ): Promise<any> {
    return await this.mediator.execute(cmd);
  }
}
