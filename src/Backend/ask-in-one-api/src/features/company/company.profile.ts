import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddCompanyCommand, AddCompanyRequest } from './add-company';
import { Company } from '../../entities/company.entity';

@Injectable()
export class CompanyProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AddCompanyCommand, Company);
      createMap(mapper, AddCompanyRequest, AddCompanyCommand);
    };
  }
}
