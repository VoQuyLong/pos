import { PartialType } from '@nestjs/swagger';
import { CreateGenderDto } from './create-gender.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Validate, IsString, IsNotEmpty } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGenderDto extends PartialType(CreateGenderDto) {
  @Field()
  @ApiProperty({ example: 'Male' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Gender'], {
    message: 'Gender already exists',
  })
  name: string | null;
}
