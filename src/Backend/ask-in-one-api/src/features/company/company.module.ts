import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, CompanyBranch } from '../../entities/company.entity';
import { AddCompanyCommandHandler } from './add-company';
import { CompanyController } from './company.controller';
import { CompanyProfile } from './company.profile';

const handlers = [AddCompanyCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyBranch]), CqrsModule],
  controllers: [CompanyController],
  providers: [...handlers, CompanyProfile],
})
export class CompanyModule {}
