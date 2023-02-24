import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AggregationRoot, AskEntity } from "./seed-work";

@Entity()
export class Company extends AggregationRoot {
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

    @OneToMany(() => CompanyBranch, (b) => b.company)
    Branches: CompanyBranch[];
}

@Entity()
export class CompanyBranch extends AskEntity {

    @ManyToOne(() => Company, (c) => c.Branches)
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @Column({
        type: 'int4',
    })
    companyId: number;

    @Column({
        nullable: false,
        default: '',
    })
    name: string;
}