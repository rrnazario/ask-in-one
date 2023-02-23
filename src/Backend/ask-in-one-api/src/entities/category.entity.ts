import { Column } from "typeorm";
import { AggregationRoot } from "./seed-work"

export class Category extends AggregationRoot {
    @Column({
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        nullable: false,
        default: '',
    })
    logoUrl: string;
}