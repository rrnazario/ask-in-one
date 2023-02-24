import { AutoMap } from "@automapper/classes";
import { Column, Entity } from "typeorm";
import { AggregationRoot } from "./seed-work";

@Entity()
export class Waiter extends AggregationRoot {
    @AutoMap()
    @Column({
        nullable: false,
        default: '',
    })
    name: string;

    @AutoMap()
    @Column({
        nullable: false,
        default: '',
    })
    login: string;

    @AutoMap()
    @Column({
        nullable: false,
        default: '',
    })
    password: string;
}