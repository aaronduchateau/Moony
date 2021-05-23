// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "./PROJECT_XXX.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {
    Mooney MyMoon;

    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        MyMoon = new Mooney();
    }

    function checkCorrectTotalSupply() public {
        Assert.equal(MyMoon.totalSupply(), uint256(45000000000000000), "2 should be equal to 2");
    }
    
    function checkGetFraction() public {
        Assert.equal(MyMoon.getFraction(3,100), 3, "2 should be equal to 2");
    }
    
    function checkCorrectTaxableThresholds() public {
        //taxableThresholds[0] = [3000, 0];
    	//taxableThresholds[1] = [5000, 200];
    	//taxableThresholds[2] = [6000, 300];
    	uint256[] memory result = MyMoon.determineTax(5);
        Assert.equal(result[0], uint256(5), "threshold 1 - full amount - does not equal 5");
        Assert.equal(result[1], uint256(0), "threshold 1 - tax amount - does not equal 0");
        
        uint256[] memory result2 = MyMoon.determineTax(3500);
        Assert.equal(result2[0], uint256(3300), "threshold 1 - full amount - does not equal 5");
        Assert.equal(result2[1], uint256(200), "threshold 1 - tax amount - does not equal 5");
        
        uint256[] memory result3 = MyMoon.determineTax(5500);
        Assert.equal(result3[0], uint256(5200), "threshold 1 - full amount - does not equal 5");
        Assert.equal(result3[1], uint256(300), "threshold 1 - tax amount - does not equal 5");
    }

    function checkSuccess2() public pure returns (bool) {
        // Use the return value (true or false) to test the contract
        return true;
    }
    
    function checkFailure() public {
        Assert.equal(uint(1), uint(2), "1 is not equal to 2");
    }

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
