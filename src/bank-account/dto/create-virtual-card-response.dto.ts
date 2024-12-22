import { ApiProperty } from '@nestjs/swagger';

export class CreateVirtualCardResponseDto {
  @ApiProperty({
    description: 'Consent url necessary to complete virtual card creation',
    type: String,
  })
  consentUrl!: string;
  @ApiProperty({
    description: 'Unique identifier if the virtual card',
    type: String,
  })
  cardId: string;
}
