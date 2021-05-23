// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../contracts/MOONEY_SIMPLE.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract TestMooney {
    Mooney myMooney;
    function beforeAll() public {
        myMooney = new Mooney(45000000000000000);
    }
     
    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-5
    /// #value: 1375748393000
    function checkAsshatWhoTriesFreeTransfer() public {
        uint256 transferAmount = 1375748393000;
        uint256 originalBalance0 = myMooney.balanceOf(TestsAccounts.getAccount(5));
        uint256 originalBalance1 = myMooney.balanceOf(TestsAccounts.getAccount(1));
        try myMooney.transferTaxFree(TestsAccounts.getAccount(1),transferAmount) {
            myMooney.transferTaxFree(TestsAccounts.getAccount(1),transferAmount);
            //Assert.ok(false, 'method execution should fail');
        } catch Error(string memory reason) {
            uint256 afterBalance0 = myMooney.balanceOf(TestsAccounts.getAccount(5));
            uint256 afterBalance1 = myMooney.balanceOf(TestsAccounts.getAccount(1));
            Assert.equal(reason, 'Invalid class', 'failed with unexpected reason');
            // Account-0 has the right balance?
            Assert.equal(afterBalance0 , originalBalance1, "these should be equal for first account");
            // Account-1 has the right balance?
            Assert.equal(afterBalance1 , originalBalance1, "these should be equal for second account");
        }
    }
}
