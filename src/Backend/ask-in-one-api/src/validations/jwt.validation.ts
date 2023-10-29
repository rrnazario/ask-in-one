import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserType } from 'src/entities/user.entity';

import { SetMetadata } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtConfiguration } from 'src/infra/config';

export const AllowedFor = (...roles: UserType[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  private allowedUsers: UserType[];
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserType[]>('roles', context.getHandler());
    this.allowedUsers = roles;

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (
      err ||
      !user ||
      (this.allowedUsers && this.allowedUsers.indexOf(user.type) < 0)
    ) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtConfiguration.Factory.KEY)
    private _: ConfigType<typeof JwtConfiguration.Factory>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const info = {
      userId: payload.sub,
      username: payload.username,
      type: payload.type as UserType,
    };

    return info;
  }
}
