import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsBoolean } from 'class-validator';

export class EmployeeStatusSetDto {
  @IsPhoneNumber('KR')
  @IsString()
  @ApiProperty({
    example: '010-1234-1234',
    description: 'Employee phone number',
    required: true,
  })
  employeePhoneNumber: string;

  @IsBoolean()
  @ApiProperty({
    example: 'True / False',
    description: 'Employee Status',
    required: true,
  })
  isAuthenticated: boolean;
}
