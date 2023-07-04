import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  MinLength,
  Validate,
  IsString,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'long@example.com' })
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'Long' })
  @IsString()
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'VQ' })
  @IsString()
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: String })
  @IsString()
  @IsIn(['admin', 'client'], {
    message: 'roleNotExists',
  })
  role?: string | null;

  @ApiProperty({ type: String })
  @IsString()
  @IsIn(['active', 'unactive'], {
    message: 'statusNotExists',
  })
  status?: string;

  hash?: string | null;
}
