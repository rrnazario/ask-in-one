import { Column, JoinColumn, OneToOne } from "typeorm";
import { Category } from "./category.entity";
import { AggregationRoot } from "./seed-work";

export class Dish extends AggregationRoot {
    @Column({
        nullable: false,
        default: '',
    })
    nome: string;

    @Column({
        type: 'int4',
        nullable: false,
    })
    categoryid: number;

    @OneToOne(() => Category, {  })
    @JoinColumn({ name: 'categoryid' })
    category: Category;

    @Column({
        type: 'float4',
        nullable: false,
    })
    price: number;

    @Column({
        type: 'bool',
        nullable: false,
    })
    inStock: boolean;
}