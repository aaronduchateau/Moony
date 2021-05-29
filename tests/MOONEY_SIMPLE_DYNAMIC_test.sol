// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../contracts/MOONEY_SIMPLE.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract TestMooney is Mooney(45000000000000000) {
    
    function beforeAll() public {
    }
    
    /// Custom Transaction Context
    /// See more: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-0
    /// #value: 100
    function checkCorrectTaxableThresholdsFixedAndPercentage() public {
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
        updateTaxableThresholdsAtIndex(2, 6000, 1, 3, 60, 0,0);
        updateTaxableThresholdsAtIndex(3, 7000, 1, 3, 55, 13,1);
        updateTaxableThresholdsAtIndex(4, 800000000, 1, 3, 87, 13,1);
        updateTaxableThresholdsAtIndex(5, 0, 2, 6, 0, 13,1);
        
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
        Assert.equal(result4[0], uint256(6432), "threshold 4 - sent amount");
        Assert.equal(result4[1], uint256(55), "threshold 4 - burn amount");
        Assert.equal(result4[2], uint256(13), "threshold 4 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result4[0] + result4[1] + result4[2], 6500,"threshold 4 adds back up");
        
        uint256[] memory result5 = determineTax(uint256(7777));
        Assert.equal(result5[0], uint256(7677), "threshold 5 - sent amount");
        Assert.equal(result5[1], uint256(87), "threshold 5 - burn amount");
        Assert.equal(result5[2], uint256(13), "threshold 5 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result5[0] + result5[1] + result5[2], 7777,"threshold 5 adds back up");
        
        uint256[] memory result6 = determineTax(uint256(800000001));
        Assert.equal(result6[0], uint256(799999988), "threshold 6 - sent amount");
        Assert.equal(result6[1], uint256(0), "threshold 6 - burn amount");
        Assert.equal(result6[2], uint256(13), "threshold 6 - tax amount");
        
        //test that everything adds back up 
        Assert.equal(result6[0] + result6[1] + result6[2], 800000001,"threshold 6 adds back up");
    }
    
}
