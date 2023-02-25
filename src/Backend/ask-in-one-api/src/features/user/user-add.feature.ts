import { AutoMap } from "@automapper/classes";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNotEmpty, MinLength } from "class-validator";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

export class AddUserRequest {
    @AutoMap()
    public readonly name: string;

    @AutoMap()
    public readonly login: string;

    @AutoMap()
    public readonly password: string;

    constructor(name: string, login: string, password: string) {
        this.name = name;
        this.login = login;
        this.password = password;
    }
}

export class AddUserCommand {

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

    constructor(name: string, login: string, password: string) {
        this.name = name;
        this.login = login;
        this.password = password;
    }
}

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async execute(cmd: AddUserCommand): Promise<any> {
        const model = this.mapper.map(cmd, AddUserCommand, User);

        if (! await this.userRepository.exist({
            where: {
                login: model.login,
            }
        })){
            await this.userRepository.save(model);
        }
    }
}