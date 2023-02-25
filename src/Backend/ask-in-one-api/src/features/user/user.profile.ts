import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddUserCommand, AddUserRequest } from './user-add.feature';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, AddUserCommand, User);
            createMap(mapper, AddUserRequest, AddUserCommand);
        };
    }
}