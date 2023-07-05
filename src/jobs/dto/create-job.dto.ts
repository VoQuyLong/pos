import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate, IsString } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateJobDto {
  @Field()
  @ApiProperty({ example: 'VNPT' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Job'], {
    message: 'Job already exists',
  })
  name: string | null;
}
