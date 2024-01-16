import { MoneyExchangeAvaiable } from '../../../schema/moneyexchange.schema';
import { Atm } from '../../../schema/atm.schema';
import { Transaction } from '../../../schema/transaction.schema';

export type NotesAvailableToPush = { [valor: number]: number };
export type ResultWithDraw = {
  withdrawnNotes: NotesAvailableToPush;
  currentBalance: number;
};
export interface WithdrawInterface {
  checkNotesAvailable: (notes: MoneyExchangeAvaiable) => NotesAvailableToPush;

  getNotes: (
    notes: NotesAvailableToPush,
    amount: number,
    initialBalance: number,
  ) => ResultWithDraw;

  onTransaction: (
    atm: Atm,
    accountId: string,
    transaction: Transaction,
  ) => Transaction;
}
