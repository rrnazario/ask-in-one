import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../../../entities/company.entity";
import { Repository } from "typeorm";
import { AddCompanyCommand } from "./add-company.model";

@CommandHandler(AddCompanyCommand)
export class AddCompanyCommandHandler implements ICommandHandler<AddCompanyCommand> {
    constructor(
        @InjectRepository(Company)
        private readonly repository: Repository<Company>,
        @InjectMapper() 
        private readonly mapper: Mapper,
    ) { }

    async execute(cmd: AddCompanyCommand): Promise<any> {
        let company = await this.repository.findOneBy({ login: cmd.login });

        if (company) {
            company.UdpateInfo(cmd.name);            
            company = await this.repository.save(company)
        }
        else {
            const model = await this.mapper.mapAsync(cmd, AddCompanyCommand, Company);
            company = await this.repository.save(model);
        }

        return {
            id: company.id
        }
    }
}