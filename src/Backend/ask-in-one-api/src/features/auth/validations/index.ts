import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class UserValidator {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ login: username });

        if (user && user.password === password) {
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
        const user = await this.validator.validate(username,password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}