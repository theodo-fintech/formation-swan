import { ApiProperty } from '@nestjs/swagger';
import Decimal from 'decimal.js';

export class BalanceResponseDto {
  @ApiProperty({
    description: 'balance in euros',
    type: Decimal,
    example: 1500,
  })
  amount!: Decimal;
}
