import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { DoLoginCommand, DoLoginRequest } from './do-login';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, DoLoginRequest, DoLoginCommand);
      createMap(mapper, DoLoginCommand, User);
    };
  }
}
