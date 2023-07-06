import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Validate,
  IsString,
  IsIn,
} from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @ApiProperty({ example: 'long@example.com' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @Field()
  @ApiProperty()
  @MinLength(6)
  password?: string;

  @Field()
  @ApiProperty({ example: 'Long' })
  @IsString()
  @IsNotEmpty()
  firstName: string | null;

  @Field()
  @ApiProperty({ example: 'VQ' })
  @IsString()
  @IsNotEmpty()
  lastName: string | null;

  @Field({ defaultValue: 'client' })
  @ApiProperty({ type: String })
  @IsString()
  @IsIn(['admin', 'client'], {
    message: 'roleNotExists',
  })
  role?: string | null;

  @Field({ defaultValue: 'active' })
  @ApiProperty({ type: String })
  @IsString()
  @IsIn(['active', 'unactive'], {
    message: 'statusNotExists',
  })
  status?: string;

  hash?: string | null;
}
