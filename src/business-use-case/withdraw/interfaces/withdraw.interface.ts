import { MoneyExchangeAvaiable } from '../../../schema/moneyexchange.schema';

export type NotesAvailableToPush = { [valor: number]: number };
export type ResultWithDraw = {
  withdrawnNotes: NotesAvailableToPush;
  currentBalance: number;
};
export interface WithdrawInterface {
  checkNotesAvailable: (notes: MoneyExchangeAvaiable) => NotesAvailableToPush;
  getNotes: (
    notes: NotesAvailableToPush,
    totalAmount: number,
    initialBalance: number,
  ) => ResultWithDraw;
}
