import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { DoLoginRequest } from "./do-login.model";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class UserValidator {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async validate(cmd: DoLoginRequest): Promise<any> {
        const user = await this.userRepository.findOneBy({ login: cmd.username });

        if (user && user.password === cmd.password) {
           return user;
        }

        return null;
    }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validator: UserValidator) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {        
        const user = await this.validator.validate({
            username: username,
            password: password,
            companyId: null
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}