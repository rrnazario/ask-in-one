import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddUserCommand, AddUserRequest } from './user-add';
import { User, UserType } from 'src/entities/user.entity';
import { GetAllUsersResponse } from './get-all-users';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AddUserCommand, User);
      //forMember((destination) => destination.userType, fromValue(UserType.Waiter)));

      createMap(mapper, AddUserRequest, AddUserCommand);
      createMap(
        mapper,
        User,
        GetAllUsersResponse,
        forMember(
          (d) => d.userType,
          mapFrom((f) => UserType[f.userType]),
        ),
      );
    };
  }
}
