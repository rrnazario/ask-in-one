import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waiter } from 'src/entities/waiter.entity';
import { AddWaiterCommandHandler } from './waiter-add.feature';
import { WaiterController } from './waiter.controller';
import { WaiterProfile } from './waiter.profile';

const handlers = [
    AddWaiterCommandHandler
]

@Module({
    imports: [
        TypeOrmModule.forFeature([Waiter]),
        CqrsModule,        
    ],
    controllers: [WaiterController],
    providers: [
        ...handlers,
        WaiterProfile
    ],
})
export class WaiterModule { }