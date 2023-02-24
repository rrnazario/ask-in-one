import { AutoMap } from "@automapper/classes";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNotEmpty, MinLength } from "class-validator";
import { Waiter } from "src/entities/waiter.entity";
import { Repository } from "typeorm";

export class AddWaiterRequest {
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

export class AddWaiterCommand {

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

@CommandHandler(AddWaiterCommand)
export class AddWaiterCommandHandler implements ICommandHandler<AddWaiterCommand> {
    constructor(
        @InjectRepository(Waiter)
        private readonly waiterRepository: Repository<Waiter>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async execute(cmd: AddWaiterCommand): Promise<any> {
        const model = this.mapper.map(cmd, AddWaiterCommand, Waiter);

        if (! await this.waiterRepository.exist({
            where: {
                login: model.login,
            }
        })){
            await this.waiterRepository.save(model);
        }
    }
}