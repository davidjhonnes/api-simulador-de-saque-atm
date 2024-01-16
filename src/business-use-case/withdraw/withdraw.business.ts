import {
  NotesAvailableToPush,
  ResultWithDraw,
  WithdrawInterface,
} from './interfaces/withdraw.interface';
import { MoneyExchangeAvaiable } from '../../schema/moneyexchange.schema';

export class WithdrawBusiness implements WithdrawInterface {
  private listNotesAvailable: NotesAvailableToPush = {
    100: 0,
    50: 0,
    20: 0,
    10: 0,
  };

  checkNotesAvailable(notes: MoneyExchangeAvaiable): NotesAvailableToPush {
    this.listNotesAvailable[10] = notes.notes10;
    this.listNotesAvailable[20] = notes.notes20;
    this.listNotesAvailable[50] = notes.notes50;
    this.listNotesAvailable[100] = notes.notes100;

    return this.listNotesAvailable;
  }
  getNotes(
    notes: NotesAvailableToPush,
    totalAmount: number,
    initialBalance: number,
  ): ResultWithDraw {
    let currentBalance: number = initialBalance;
    let amount: number = totalAmount;
    console.log('saldo atual', initialBalance);
    // Define available notes and their initial quantities
    const withdrawnNotes: NotesAvailableToPush = {};

    // Check if the withdrawal amount is valid
    if (amount <= 0 || amount > currentBalance) {
      console.log('Invalid amount or insufficient balance.');
      return;
    }
    console.log('saldo atual', initialBalance);

    // Sort available notes in descending order
    const sortedNotes = Object.keys(notes)
      .map(Number)
      .sort((a, b) => b - a);

    // Calculate the number of notes for each available value
    for (const noteValue of sortedNotes) {
      if (amount >= noteValue && notes[noteValue] > 0) {
        const quantityOfNotes: number = Math.min(
          Math.floor(amount / noteValue),
          notes[noteValue],
        );
        withdrawnNotes[noteValue] = quantityOfNotes;
        amount -= quantityOfNotes * noteValue;
        notes[noteValue] -= quantityOfNotes;
      }
    }

    // Update the balance
    currentBalance = initialBalance - totalAmount;
    console.log('initialBalance', initialBalance);

    console.log('currentBalance', currentBalance);
    console.log('amount amount', amount);

    // Display the result
    console.log('Withdrawn notes:');
    for (const note in withdrawnNotes) {
      console.log(`${withdrawnNotes[note]} note(s) of $${note}.00`);
    }

    console.log(`Current balance: $${currentBalance}.00`);

    return {
      withdrawnNotes: withdrawnNotes,
      currentBalance: currentBalance,
    };
  }
}
