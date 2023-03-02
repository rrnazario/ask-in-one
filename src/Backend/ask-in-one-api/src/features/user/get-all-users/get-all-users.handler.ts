import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { GetAllUsersQuery, GetAllUsersResponse } from ".";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler implements IQueryHandler<GetAllUsersQuery, GetAllUsersResponse[]> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async execute(_: GetAllUsersQuery): Promise<GetAllUsersResponse[]> {
        const users = await this.userRepository.find();
        const converted = users.map(user => this.mapper.map(user, User, GetAllUsersResponse));

        return converted;
    }
}