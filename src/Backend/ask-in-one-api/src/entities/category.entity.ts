import { Column, Entity } from "typeorm";
import { AggregationRoot } from "./seed-work"

@Entity()
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