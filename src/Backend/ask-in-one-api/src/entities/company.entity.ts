import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AggregationRoot, AskEntity } from "./seed-work";
import { User } from "./user.entity";

@Entity()
export class Company extends AggregationRoot {
    @AutoMap()
    @Column({
        nullable: false,
        default: '',
    })
    private name: string;

    @AutoMap()
    @Column({
        nullable: false,
        default: '',
    })
    readonly login: string;

    @OneToMany(() => CompanyBranch, (b) => b.company)
    Branches: CompanyBranch[];

    @OneToMany(() => User, (b) => b.company)
    Users: User[];

    UdpateInfo(name: string) : Company {
        this.name = name;

        return this
    }

    UpdateId(companyId: number) : Company {
        this.id = companyId;

        return this
    }
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