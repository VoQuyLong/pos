import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'long@example.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @Validate(IsExist, ['User'], {
    message: 'emailNotExists',
  })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
