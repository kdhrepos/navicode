import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class EmployeeStatusCheckDto {
  @IsPhoneNumber('KR')
  @IsString()
  @ApiProperty({
    example: '010-1234-1234',
    description: 'Put employee phone number',
    required: true,
  })
  employeePhoneNumber: string;
}
