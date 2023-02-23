import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Dish } from "./dish.entity";
import { AggregationRoot, AskEntity } from "./seed-work";

export class Order extends AggregationRoot {
    /*Pedido
- NrMesa
- PedidoItem[]
- Fechar()
PedidoItem
- PedidoId
- PratoId
- Quantidade*/

    @Column({
        nullable: false,
        default: '',
    })
    tableCode: string;

    @OneToMany(() => OrderItem, (b) => b.company)
    Items: OrderItem[];

    @Column({
        type: 'int4'
    })
    status: OrderStatus;

    public Close() {
        this.status = OrderStatus.Closed
    }
}

export enum OrderStatus {
    Opened,
    Closed
}

export class OrderItem extends AskEntity {

    @ManyToOne(() => Order, (c) => c.Items)
    @JoinColumn({ name: 'orderId' })
    company: Order;

    @Column({
        type: 'int4',
    })
    orderId: number;

    @OneToOne(() => Dish, { })
    @JoinColumn({ name: 'dishId' })
    dish: Dish;

    @Column({
        type: 'int4',
    })
    dishId: number;
}