import { PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-district.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Validate, IsString, IsNotEmpty } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
  @Field()
  @ApiProperty({ example: 'Driver' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['District'], {
    message: 'District already exists',
  })
  name: string | null;
}
