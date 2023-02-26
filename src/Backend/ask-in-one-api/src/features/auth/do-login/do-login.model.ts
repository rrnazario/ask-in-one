import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, MinLength } from "class-validator";

export class DoLoginRequest {
    @AutoMap()
    public readonly username: string;

    @AutoMap()
    public readonly password: string;

    @AutoMap()
    public readonly companyId: number;

    constructor(username: string, password: string, companyid: number) {
        this.username = username;
        this.password = password;
        this.companyId = companyid;
    }
}

export class DoLoginCommand {

    @AutoMap()
    @IsNotEmpty()
    public readonly companyId: number;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(3)
    public readonly username: string;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(6)
    public readonly password: string;

    constructor(username: string, password: string, companyId: number) {
        this.companyId = companyId;
        this.username = username;
        this.password = password;
    }
}