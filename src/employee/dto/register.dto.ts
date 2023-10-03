import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class EmployeeRegisterDto {
  @IsString()
  @ApiProperty({
    example: '67636c14-5e02-11ee-8c99-0242ac120002',
    description: 'Company UUID',
    required: true,
  })
  companyUUID: string;

  @IsPhoneNumber('KR')
  @ApiProperty({
    example: '010-1234-1234',
    description: 'Employee phone number',
    required: true,
  })
  employeePhoneNumber: string;

  @IsString()
  @ApiProperty({
    example: '19234934',
    description: 'Employee number',
    required: true,
  })
  employeeNumber: string;

  @IsString()
  @ApiProperty({
    example: 'Kim chul su',
    description: 'Employee name',
    required: true,
  })
  employeeName: string;
}
