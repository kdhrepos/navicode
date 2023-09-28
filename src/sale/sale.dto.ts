import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class RestaurantRequestDto {
  @IsString()
  @ApiProperty({
    example: 'BHC',
    description: 'Restaurant name for search',
    required: true,
  })
  restaurantName: string;

  @IsDate()
  @ApiProperty({
    example: '2023-10-03',
    description: 'Start date to search',
    required: true,
  })
  fromDate: string;

  @IsDate()
  @ApiProperty({
    example: '2023-10-10',
    description: 'Last date to search',
    required: true,
  })
  toDate: string;
}

export class CompanyRequestDto {
  @IsString()
  @ApiProperty({
    example: '67636c14-5e02-11ee-8c99-0242ac120002',
    description: 'Company Unique UUID',
    required: true,
  })
  companyId: string;

  @IsDate()
  @ApiProperty({
    example: '2023-10-03',
    description: 'Start date to search',
    required: true,
  })
  fromDate: string;

  @IsDate()
  @ApiProperty({
    example: '2023-10-10',
    description: 'Last date to search',
    required: true,
  })
  toDate: string;
}
