import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, forMember, fromValue } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddUserCommand, AddUserRequest } from './user-add';
import { User, UserType } from 'src/entities/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, AddUserCommand, User,
                forMember((destination) => destination.userType, fromValue(UserType.Waiter)));

            createMap(mapper, AddUserRequest, AddUserCommand);
        };
    }
}