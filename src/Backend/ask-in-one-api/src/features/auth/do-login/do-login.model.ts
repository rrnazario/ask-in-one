import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, MinLength } from "class-validator";

export class DoLoginRequest {
    @AutoMap()
    public readonly username: string;

    @AutoMap()
    public readonly password: string;

    @AutoMap()
    public readonly company: string;

    @AutoMap()
    public readonly companyId: number;

    constructor(username: string, password: string, companyid: number, company: string) {
        this.username = username;
        this.password = password;
        this.companyId = companyid;
        this.company = company;
    }
}

export class DoLoginCommand {

    @AutoMap()
    public readonly companyId: number;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(3)
    public readonly username: string;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(6)
    public readonly password: string;

    @AutoMap()
    public readonly company: string;

    constructor(username: string, password: string, companyId: number, company: string) {
        this.companyId = companyId;
        this.company = company;
        this.username = username;
        this.password = password;
    }
}