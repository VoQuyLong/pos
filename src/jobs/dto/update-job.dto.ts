import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Validate, IsString, IsNotEmpty } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateJobDto extends PartialType(CreateJobDto) {
  @Field()
  @ApiProperty({ example: 'Driver' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Job'], {
    message: 'Job already exists',
  })
  name: string | null;
}
