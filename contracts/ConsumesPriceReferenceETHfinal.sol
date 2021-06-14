// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorInterface.sol";

contract ConsumesPriceReferenceETH_CL {
    
    uint256 weiBase_ = 1000000000000000000;

    AggregatorInterface internal priceFeed;
    event Calculated(uint256 numWeiInDollar, uint256 pricePerToken, uint256 pricePerWei,  uint256 Awardedtokens);
    using SafeMath for uint256;
    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor(address AggregatorInterfaceAddress) public {
        priceFeed = AggregatorInterface(AggregatorInterfaceAddress);
    }
  
    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int256) {
        return priceFeed.latestAnswer();
    }

    /**
     * Returns the timestamp of the latest price update
     */
    function getLatestPriceTimestamp() public view returns (uint256) {
        return priceFeed.latestTimestamp();
    }
    
    function getPriceOfETH() private view returns (uint256) {
        return uint256(getLatestPrice());
    }
    
    function getNumberOfWeiInDollar() public view returns (uint256) {
        return weiBase_.div(getPriceOfETH().div(100000000));
    }
    
    function calculateTokensBack(uint256 ethIn, uint256 prePurchaseTargetMarketCap,uint256 totalSupply) public returns (uint256[] memory) {
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        uint256 pricePerToken = (totalSupply - weiBase_).div(prePurchaseTargetMarketCap);
        uint256 pricePerWei = ethIn.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        uint256[] memory results = new uint256[](7);
        results[0] = ethIn;
        results[1] = prePurchaseTargetMarketCap;
        results[2] = numWeiInDollar;
        results[3] = totalSupply;
        results[4] = pricePerToken;
        results[5] = pricePerWei;
        results[6] = awardedTokens;
        return results;
    }
}

library SafeMath { 
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
    
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a * b;
		assert(a == 0 || c / a == b);
		return c;
	}
	
	function div(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a / b;
		return c;
	}
}