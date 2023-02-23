import { Column } from "typeorm";
import { AggregationRoot } from "./seed-work";

export class Waiter extends AggregationRoot {
    @Column({
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        nullable: false,
        default: '',
    })
    login: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;
}