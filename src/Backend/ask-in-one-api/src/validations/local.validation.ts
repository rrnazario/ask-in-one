import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private company: Company;

  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const body = context.switchToHttp().getRequest().body;
    const companyName = body.company;

    this.companyRepo
      .findOneBy({ login: companyName })
      .then((c) => (this.company = c));

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user || !this.company || this.company.id !== user.companyId) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class UserValidator {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ login: username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) return user;
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
    const user = await this.validator.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
