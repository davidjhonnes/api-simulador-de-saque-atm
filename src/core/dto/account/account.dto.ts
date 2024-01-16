import { ApiResponseProperty } from '@nestjs/swagger';
import { Customer } from '../../../schema/customer.schema';
export class AccountDto {
  @ApiResponseProperty()
  customer: Customer;
  @ApiResponseProperty()
  cardNumber: string;
  @ApiResponseProperty()
  accountNumber: number;
  @ApiResponseProperty()
  accountNumberDigit: number;
  @ApiResponseProperty()
  currentBalanceAccount: number;
  @ApiResponseProperty()
  _createdAt: Date;
  @ApiResponseProperty()
  _updatedAt: Date;
}
