import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CompanyLoginDto {
  @IsString()
  @ApiProperty({
    example: 'asd123',
    description: 'Company ID in web',
    required: true,
  })
  companyId: string;

  @IsString()
  @ApiProperty({
    example: 'qwe123',
    description: 'Company Password in web',
    required: true,
  })
  companyPassword: string;
}
