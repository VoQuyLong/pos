import { PartialType } from '@nestjs/swagger';
import { CreateTelecomProviderDto } from './create-telecom.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Validate, IsString, IsNotEmpty } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTelecomProviderDto extends PartialType(
  CreateTelecomProviderDto,
) {
  @Field()
  @ApiProperty({ example: 'VNPT' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['TelecomProvider'], {
    message: 'TelecomProvider already exists',
  })
  name: string | null;
}
