import { registerAs } from '@nestjs/config';

export abstract class JwtConfig {
  public secret: string;

  public static KEY = 'jwt';
}

export default registerAs(
  JwtConfig.KEY,
  (): JwtConfig => ({
    secret: process.env.SECRET,
  }),
);
