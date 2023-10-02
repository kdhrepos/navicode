import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsPhoneNumber } from 'class-validator';

export class TicketValidationDto {
  @IsString()
  @ApiProperty({
    example: '0401b9664d5a415fa30d747a51df147d',
    description: 'Ticket unique UUID without dashes',
    required: true,
  })
  uuid: string;

  @IsString()
  @ApiProperty({
    example: '0401b9664d5a415fa30d747a51df147d',
    description: 'Employee ticket code',
    required: true,
  })
  ticketCode: string;

  @IsPhoneNumber('KR')
  @IsString()
  @ApiProperty({
    example: '010-1234-1234',
    description: 'Employee phone number',
    required: true,
  })
  employeePhoneNumber: string;

  @IsDate()
  @ApiProperty({
    example: '2023-09-07T13:48:16',
    description: 'Timestamp',
    required: true,
  })
  timeStamp: Date;

  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'Employee count',
    required: true,
  })
  employeeCount: number;
}

export class CompanyRequestDto {
  @IsString()
  @ApiProperty({
    example: '0401b9664d5a415fa30d747a51df147d',
    description: 'Company Unique UUID',
    required: true,
  })
  companyUuid: string;
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
