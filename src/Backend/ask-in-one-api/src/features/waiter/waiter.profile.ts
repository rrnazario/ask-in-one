import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddWaiterCommand, AddWaiterRequest } from './waiter-add.feature';
import { Waiter } from 'src/entities/waiter.entity';

@Injectable()
export class WaiterProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, AddWaiterCommand, Waiter);
            createMap(mapper, AddWaiterRequest, AddWaiterCommand);
        };
    }
}