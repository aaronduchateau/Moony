pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorInterface.sol";

contract ConsumesPriceReferenceXUA_CL {

    AggregatorInterface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: XAG/USD
     * Address: 0x379589227b15F1a12195D3f2d90bBc9F31f95235
     */
    constructor() public {
        priceFeed = AggregatorInterface(0xc8fb5684f2707C82f28595dEaC017Bfdf44EE9c5);
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
}