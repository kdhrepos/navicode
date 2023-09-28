import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EmployeeRegisterDto {
  @IsString()
  @ApiProperty({
    example: 'Samsung',
    description: 'Company name',
    required: true,
  })
  companyId: string;

  @IsString()
  @ApiProperty({
    example: '010-1234-1234',
    description: 'Employee phone number',
    required: true,
  })
  employeePhoneNumber: string;

  @IsNumber()
  @ApiProperty({
    example: '19234934',
    description: 'Employee number for company ',
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
