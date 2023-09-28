import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CompanySearchDto {
  @IsString()
  @ApiProperty({
    example: 'samsung',
    description: 'Company Name',
    required: true,
  })
  companyName: string;
}
