import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class TicketValidationDto {}

export class CompanyRequestDto {
  @IsString()
  @ApiProperty({
    example: '67636c14-5e02-11ee-8c99-0242ac120002',
    description: 'Company Unique UUID',
    required: true,
  })
  companyId: string;
}

export class RestaurantRequestDto {
  @IsString()
  @ApiProperty({
    example: 'BHC',
    description: 'Restaurant name for search',
    required: true,
  })
  restaurantName: string;
}
