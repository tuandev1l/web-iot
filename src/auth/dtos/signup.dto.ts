import { Equals, IsNotEmpty, Matches } from 'class-validator';
import { PasswordValidate } from './password.dto';

export class SignupCredentials extends PasswordValidate {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;
}
