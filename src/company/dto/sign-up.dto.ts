import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BeforeCreate } from 'sequelize-typescript';

export class CompanySignUpDto {
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

  @IsString()
  @ApiProperty({
    example: 'samsung',
    description: 'Company Name',
    required: true,
  })
  companyName: string;

  @IsString()
  @ApiProperty({
    example: 'BHC',
    description: 'Restaurant Name contracted with company',
    required: true,
  })
  restaurantName: string;

  @IsNumber()
  @ApiProperty({
    example: '5000',
    description: 'Cost that employee can use per one meal',
    required: true,
  })
  restaurantCost: number;
}
