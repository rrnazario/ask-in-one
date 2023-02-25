import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, MinLength } from "class-validator";

export class AddCompanyRequest {
    @AutoMap()
    public readonly name: string;

    @AutoMap()
    public readonly login: string;

    constructor(name: string, login: string) {
        this.name = name;
        this.login = login;
    }
}

export class AddCompanyCommand {
    @AutoMap()
    @IsNotEmpty()
    @MinLength(3)
    public readonly name: string;

    @AutoMap()
    @IsNotEmpty()
    @MinLength(2)
    public readonly login: string;

    constructor(name: string, login: string) {
        this.name = name;
        this.login = login;
    }
}