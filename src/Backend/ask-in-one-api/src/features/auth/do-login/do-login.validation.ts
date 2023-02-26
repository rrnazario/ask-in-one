import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt } from "passport-jwt";
import { Strategy as pJwtStrategy } from "passport-jwt";
import { Strategy as lStrategy} from "passport-local";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { jwtConstants } from "../auth.constants";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

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
export class LocalStrategy extends PassportStrategy(lStrategy) {
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

@Injectable()
export class JwtStrategy extends PassportStrategy(pJwtStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}