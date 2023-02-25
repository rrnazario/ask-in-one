import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, MinLength } from "class-validator";

export class AddUserRequest {
    @AutoMap()
    public readonly companyId: number;
    
    @AutoMap()
    public readonly name: string;

    @AutoMap()
    public readonly login: string;

    @AutoMap()
    public readonly password: string;

    constructor(name: string, login: string, password: string, companyId:number) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.companyId = companyId;
    }
}

export class AddUserCommand {

    @AutoMap()
    @IsNotEmpty()
    public readonly companyId: number;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(3)
    public readonly name: string;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(3)
    public readonly login: string;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(6)
    public readonly password: string;

    constructor(name: string, login: string, password: string, companyId: number) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.companyId = companyId;
    }
}