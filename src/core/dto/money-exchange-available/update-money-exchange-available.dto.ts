import { PartialType } from '@nestjs/swagger';
import { CreateMoneyExchangeAvailableDto } from './create-money-exchange-available.dto';

export class UpdateMoneyExchangeAvailableDto extends PartialType(CreateMoneyExchangeAvailableDto) {}
