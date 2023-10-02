import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmployeeStatusSetDto {
  @IsString()
  @ApiProperty({
    example: '010-1234-1234',
    description: 'Employee phone number',
    required: true,
  })
  employeePhoneNumber: string;

  @ApiProperty({
    example: 'True / False',
    description: 'Employee Status',
    required: true,
  })
  is_authenticated: boolean;
}
