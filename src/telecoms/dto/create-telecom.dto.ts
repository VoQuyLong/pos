import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate, IsString } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTelecomProviderDto {
  @Field()
  @ApiProperty({ example: 'VNPT' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['TelecomProvider'], {
    message: 'TelecomProvider already exists',
  })
  name: string | null;
}
