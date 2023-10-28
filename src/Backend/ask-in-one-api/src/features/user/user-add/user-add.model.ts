import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AddUserRequest {
  @AutoMap()
  public readonly companyId: number;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly login: string;

  @AutoMap()
  public readonly password: string;

  @AutoMap()
  public readonly userType: number;

  constructor(
    name: string,
    login: string,
    password: string,
    companyId: number,
    userType: number,
  ) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.companyId = companyId;
    this.userType = userType;
  }
}

export class AddUserCommand {
  @AutoMap()
  @IsNotEmpty()
  public readonly companyId: number;

  @AutoMap()
  @IsNotEmpty()
  @MinLength(3)
  public readonly name: string;

  @AutoMap()
  @IsNotEmpty()
  @MinLength(3)
  public readonly login: string;

  @AutoMap()
  @IsNotEmpty()
  @MinLength(6)
  public readonly password: string;

  @AutoMap()
  @IsNotEmpty()
  public readonly userType: number;

  constructor(
    name: string,
    login: string,
    password: string,
    companyId: number,
    userType: number,
  ) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.companyId = companyId;
    this.userType = userType;
  }
}
