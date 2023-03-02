import { AutoMap } from "@automapper/classes";
import { UserType } from "src/entities/user.entity";
import { Column } from "typeorm";

export class GetAllUsersQuery { }

export class GetAllUsersResponse {
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
        type: 'int4',
    })
    companyId: number;
    
    @AutoMap()
    @Column({
        type: 'int4',
    })
    userType: string;
}