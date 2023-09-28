import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EmployeeSearchDto {
  @IsString()
  @ApiProperty({
    example: '67636c14-5e02-11ee-8c99-0242ac120002',
    description: 'Put a company id (UUID)',
    required: true,
  })
  companyId: string;
}
