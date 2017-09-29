var assert = require('assert');
const Account = require('./ClassAccount.js');
let mAccount;

function test_Create() {
  mAccount = new Account(500);
  assert(mAccount.balance === 500, `Balance is ${mAccount.balance}`);
  return (arguments.callee.name + ' passed');
}
function test_Deposit() {
  mAccount.deposit(10000);
  assert(mAccount.balance === 10500, `Balance is ${mAccount.balance}`);
  return (arguments.callee.name + ' passed');
}
function test_Withdraw() {
  mAccount.withdraw(10000);
  assert(mAccount.balance === 500, `Balance is ${mAccount.balance}`);
  return (arguments.callee.name + ' passed');
}
function test_InsufficientFunds() {
  let tx = mAccount.withdraw(10000);
  assert(!tx, 'INSUFFICIENT_FUNDS');
  return (arguments.callee.name + ' passed');
}
function test_IllegalSetBalance() {
  let balance = mAccount.balance;
  mAccount.balance=10000000;
  assert(balance===mAccount.balance, 'ILLEGAL attempt to manipulate balance');
  return (arguments.callee.name + ' passed');
}

function test() {
  let bTestResults = false;
  let testResults = new Set();
  try {
    testResults.add(test_Create());
    testResults.add(test_Deposit());
    testResults.add(test_Withdraw());
    testResults.add(test_InsufficientFunds());
    testResults.add(test_IllegalSetBalance());

    bTestResults = true;
  } catch (e) {
    console.log('TEST FAILED: ' + e.message);
    throw e;
  } finally {
    testResults.forEach((e) => {
      console.log(e)
    });
    console.log(`test Account Suite: (${(bTestResults) ? 'PASSED' : 'FAILED'})`);
  }
}
test();
