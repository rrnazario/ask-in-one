import { PrimaryGeneratedColumn } from "typeorm";

export abstract class AskEntity {
    @PrimaryGeneratedColumn({
        type: 'int4',
        name: 'id',
    })
    id: number;
}