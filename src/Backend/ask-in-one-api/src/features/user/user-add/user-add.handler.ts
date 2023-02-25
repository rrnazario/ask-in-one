import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { AddUserCommand } from "./user-add.model";

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