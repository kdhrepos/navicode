import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RestaurantInfoDto {
  @IsString()
  @ApiProperty({
    example: 'BHC',
    description: 'Restaurant Name contracted with company',
    required: true,
  })
  restaurantName: string;
}
