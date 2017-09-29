'use strict';

class Account {

  constructor(initialBalance) {
    this._balance = initialBalance;
    this._lastTxType = 'ACCOUNT_OPENED';
    this._lastTxAmt = initialBalance;

    this._transactionCodes = {
      INSUFFICIENT_FUNDS: (lastTxType, lastTxAmt, balance) => {
        return `TranasctionType: ${lastTxType}\nAmount ${lastTxAmt} Exceeds Balance ${balance}`;
      },
      DEPOSIT_SUCCESS: (amount, balance) => {
        return `Success ${balance} + ${amount}`;
      },
      CANNOT_SET_BALANCE: (balance) => {
        return `WARNING: Balance is ${balance}, ILLEGAL ACTION: attempt to set Balance`;
      }
    }
    this._enumTXTypes = {OPENED:0, DEPOSIT:1, WITHDRAW:2};
  }

  get balance() { return this._balance };
  set balance(s) { console.log( this.transactionCodes.CANNOT_SET_BALANCE(this._balance)); }

  get txCodes() { return this._transactionCodes }
  get txTypes() { return this._enumTXTypes}

  deposit(amount){
    this._balance+=amount;
    this.showBalance();
    return
  }
  withdraw(amount) {
    let withdrawSuccess=false
    if ( amount < this._balance) {
      this._balance-=amount;
      withdrawSuccess = true;
    } else {
      this.throwInsufficientFunds(amount);
    }
    this.showBalance();
    return withdrawSuccess;
  }
  
  throwInsufficientFunds(amount) {
    console.log('Transaction Cancelled: ' + this.txCodes.INSUFFICIENT_FUNDS(this.txTypes.WITHDRAW, amount, this.balance));
    return false;
  }
  showBalance() {
    console.log(`Balance: ${this.balance}`);
    return true;
  }
}
//this is a public class
module.exports = Account;
