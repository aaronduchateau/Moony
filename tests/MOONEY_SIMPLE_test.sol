// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../contracts/MooneyFinal.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract TestMooney is Mooney(45000000000000000, 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526) {
    
    function beforeAll() public {
        
    }
     
    function checkContractOwner() public {
        Assert.equal(TestsAccounts.getAccount(0), getContractOwner(), "the instantiated owner should be the contract owner");
    }

    function checkCorrectTotalSupply() public {
        Assert.equal(totalSupply(), uint256(45000000000000000), "total should equal 45000000000000000 passed to constructor");
        Assert.equal(balanceOf(DAO_address), uint256(45000000000000000), "total should equal 45000000000000000 passed to constructor");
    }
    
    function checkOwnerCanUpdateRules() public {
        Assert.equal(updateTaxableThresholdsAtIndex(0, 3000, 0, 3, 0, 0, 0), true, "please be true");
    }
    
    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-1
    /// #value: 100
    function checkStrangerCantUpdateRules() public {
        Assert.equal(updateTaxableThresholdsAtIndex(0, 3000, 0, 3, 0, 0, 0), false, "please be false");
    }
    
    // function checkGetPriceOfETH() public  {
    //    Assert.equal(500000, getPriceOfETH(), "please be false");
    // }
    
    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-0
    /// #value: 100
    function checkCorrectTaxableThresholdsSafemoonStyle() public {
        // *********************************************
        // * the configuration below should result in: *
        // *********************************************
        // Ex: safemoon'ish tax structure
        // *********************************************
    	// taxableThresholds[0] = [3000, 0, 3, 0, 0, 0];
    	// taxableThresholds[1] = [5000, 1, 3, 0, 0, 0];
    	// taxableThresholds[2] = [6000, 1, 3, 0, 0, 0];
    	// taxableThresholds[3] = [7000, 1, 3, 0, 0, 0];
    	// taxableThresholds[4] = [800000000, 1, 3, 0, 0, 0];
    	// taxableThresholds[5] = [0, 2, 6, 0, 0, 0];
    	// *********************************************
        
        Assert.equal(updateTaxableThresholdsAtIndex(0, 3000, 0, 3, 0, 0, 0), true, "waht");
        updateTaxableThresholdsAtIndex(1, 5000, 1, 3, 0, 0, 0);
        updateTaxableThresholdsAtIndex(2, 6000, 1, 3, 0, 0, 0);
        updateTaxableThresholdsAtIndex(3, 7000, 1, 3, 0, 0, 0);
        updateTaxableThresholdsAtIndex(4, 800000000, 1, 3, 0, 0, 0);
        updateTaxableThresholdsAtIndex(5, 0, 2, 6, 0, 0, 0);
        
    	uint256[] memory result = determineTax(uint256(5));
        Assert.equal(result[0], uint256(5), "threshold 1 - sent amount");
        Assert.equal(result[1], uint256(0), "threshold 1 - burn amount");
        Assert.equal(result[2], uint256(0), "threshold 1 - tax amount");
        
        uint256[] memory result2 = determineTax(uint256(3500));
        Assert.equal(result2[0], uint256(3360), "threshold 2 - sent amount");
        Assert.equal(result2[1], uint256(35), "threshold 2 - burn amount");
        Assert.equal(result2[2], uint256(105), "threshold 2 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result2[0] + result2[1] + result2[2], 3500,"threshold 2 adds back up");
        
        uint256[] memory result3 = determineTax(uint256(5500));
        Assert.equal(result3[0], uint256(5280), "threshold 3 - sent amount");
        Assert.equal(result3[1], uint256(55), "threshold 3 - burn amount");
        Assert.equal(result3[2], uint256(165), "threshold 3 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result3[0] + result3[1] + result3[2], 5500,"threshold 3 adds back up");
        
        uint256[] memory result4 = determineTax(uint256(6500));
        Assert.equal(result4[0], uint256(6240), "threshold 4 - sent amount");
        Assert.equal(result4[1], uint256(65), "threshold 4 - burn amount");
        Assert.equal(result4[2], uint256(195), "threshold 4 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result4[0] + result4[1] + result4[2], 6500,"threshold 4 adds back up");
        
        uint256[] memory result5 = determineTax(uint256(7777));
        Assert.equal(result5[0], uint256(7469), "threshold 5 - sent amount");
        Assert.equal(result5[1], uint256(77), "threshold 5 - burn amount");
        Assert.equal(result5[2], uint256(231), "threshold 5 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result5[0] + result5[1] + result5[2], 7777,"threshold 5 adds back up");
        
        uint256[] memory result6 = determineTax(uint256(800000001));
        Assert.equal(result6[0], uint256(736000001), "threshold 6 - sent amount");
        Assert.equal(result6[1], uint256(16000000), "threshold 6 - burn amount");
        Assert.equal(result6[2], uint256(48000000), "threshold 6 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result6[0] + result6[1] + result6[2], 800000001,"threshold 6 adds back up");
    }
    
    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-0
    /// #value: 1375748393000
    function checkBasicTransactionSafemoonStyle() public {
        uint256 transferAmount = 1375748393000;
        
        uint256 originalBalance0 = balanceOf(TestsAccounts.getAccount(0));
        uint256 originalBalance1 = balanceOf(TestsAccounts.getAccount(1));
        transferTaxFree(TestsAccounts.getAccount(1),transferAmount);
        uint256 afterBalance0 = balanceOf(TestsAccounts.getAccount(0));
        uint256 afterBalance1 = balanceOf(TestsAccounts.getAccount(1));
        
        // Account-0 has the right balance?
        Assert.equal(afterBalance0 , originalBalance0 - transferAmount, "these should be equal for first account");
        // Account-1 has the right balance?
        Assert.equal(afterBalance1 , originalBalance1 + transferAmount, "these should be equal for second account");
        //Assert.equal(balanceOf(DAO_address), uint256(45000000000000000), "total should equal 45000000000000000 passed to constructor");
    }
    //to do: write a failure test
    
    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-1
    /// #value: 1375748393000
    function checkTaxTransaction() public {
        uint256 transferAmount = 6000;
        
        uint256 originalBalance0 = balanceOf(TestsAccounts.getAccount(1));
        uint256 originalBalance1 = balanceOf(TestsAccounts.getAccount(2));
        uint256 originalBalanceDAO = balanceOf(DAO_address);
        uint256 originalBalanceBURN = balanceOf(BURN_address);
        transfer(TestsAccounts.getAccount(2),transferAmount);
        uint256 afterBalance0 = balanceOf(TestsAccounts.getAccount(1));
        uint256 afterBalance1 = balanceOf(TestsAccounts.getAccount(2));
        uint256 afterBalanceDAO = balanceOf(DAO_address);
        uint256 afterBalanceBURN = balanceOf(BURN_address);
        
        Assert.equal(originalBalance0 - afterBalance0, uint256(6000), "these should be the original balance of the DAO");
        Assert.equal(afterBalance1 - originalBalance1, uint256(5760), "these should be the original balance of the DAO");
        
        Assert.equal(afterBalanceDAO - originalBalanceDAO , uint256(60), "these should be the original balance of the DAO");
        
        Assert.equal(originalBalanceBURN, uint256(0), "these should be the original balance of the DAO");
        Assert.equal(afterBalanceBURN, uint256(180), "these should increase by 1% from a 6000 transfer");
        
    }
    
    function checkGetTaxFee() public {
        Assert.equal(getTaxFee(5,3), 0, "1");
        Assert.equal(getTaxFee(1,1), 0, "1");
        Assert.equal(getTaxFee(1,10), 0, "2");
        Assert.equal(getTaxFee(1,100), 1, "3");
        Assert.equal(getTaxFee(3,100), 3, "4");
        Assert.equal(getTaxFee(30,1000), 300, "5");
        Assert.equal(getTaxFee(9,100), 9, "6");
        Assert.equal(getTaxFee(9,200), 18, "7");
        Assert.equal(getTaxFee(9,333030303030300303), 29972727272727027, "8");
    }
    

    function checkSuccess2() public pure returns (bool) {
        // Use the return value (true or false) to test the contract
        return true;
    }
    
    //function checkFailure() public {
    //    Assert.equal(uint(1), uint(2), "1 is not equal to 2");
    //}

    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-1
    /// #value: 100
    function checkSenderAndValue() public payable {
        // account index varies 0-9, value is in wei
        Assert.equal(msg.sender, TestsAccounts.getAccount(1), "Invalid sender");
        Assert.equal(msg.value, 100, "Invalid value");
    }
}