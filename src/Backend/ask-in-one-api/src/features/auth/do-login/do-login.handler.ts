import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserType } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { DoLoginCommand } from "./do-login.model";

@CommandHandler(DoLoginCommand)
export class DoLoginCommandHandler implements ICommandHandler<DoLoginCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async execute(cmd: DoLoginCommand): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { login: cmd.username, companyId: cmd.companyId }
        });

        if (!user || this.isNotValid(user)){
            return null;
        }

        const payload = { username: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    isNotValid(user: User) : boolean {
        const hasCompany = user.companyId;
        const isAdmin = user.userType === UserType.Admin;

        return !hasCompany && !isAdmin;
    }
}
