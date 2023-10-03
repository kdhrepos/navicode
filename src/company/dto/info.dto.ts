import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CompanyInfoDto {
    @IsString()
    @ApiProperty({
      example: 'asd123',
      description: 'Company Unique UUID',
      required: true,
    })
    companyUUID: string;
}
