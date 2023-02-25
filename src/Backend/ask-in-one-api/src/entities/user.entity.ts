import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "./company.entity";
import { AggregationRoot } from "./seed-work";

@Entity()
export class User extends AggregationRoot {
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

    @ManyToOne(() => Company, (c) => c.Users)
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @Column({
        type: 'int4',
    })
    companyId: number;

    @Column({
        type: 'int4',
    })
    userType: UserType;
}

export enum UserType {
    Admin,
    Waiter
}