// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract PrePurchaseMooney {

    address liquidityGenAddress;
    uint256 prePurchaseTargetMarketCap_;
    uint256 totalSupply_;
    uint256 awardedSupply_;
    mapping(address => uint256) prePurchaseBalances;
    using SafeMath2 for uint256;
    
    
    event Recieved(address indexed sender, uint256 msgVal, address indexed liquidityGenAddress);
    event CalcAndSent(uint256 one, uint256 two,uint256 three,uint256 four,uint256 five,uint256 six,uint256 seven);
    event BroadcastUserBalance(uint256 one);
    event BroadcastSubtractBalance(uint256 one);
    event BroadcastAddBalance(uint256 one);
    // ETH PF should be 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    // kovan testnet should be 0x9326BFA02ADD2366b30bacB125260Af641031331
    ConsumesPriceReferenceETH_CL public PF2;
   
    // 1000000000000000000000000000000000 totalSupply
    // Constructur takes arguement of total tokens
    constructor(uint256 startingBalance, address chainLinkAggregatorAddress) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 35000000;
    	//should be liquidityGenAddress -> 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6
    	liquidityGenAddress = msg.sender;
    	awardedSupply_ = 0;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL(chainLinkAggregatorAddress);
    }  
    
    function getContractOwner() public view returns (address) {
        return liquidityGenAddress;
    }
    
    function isContractOwner(address potentialOwner) public view returns (bool) {
        return potentialOwner == liquidityGenAddress;
    }
    
    function balanceOf(address tokenOwner) public returns (uint256) {
        uint256 balance = prePurchaseBalances[tokenOwner];
        emit BroadcastUserBalance(balance);
        return prePurchaseBalances[tokenOwner];
    }
    
    function addPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurchaseBalances[tokenOwner] = prePurchaseBalances[msg.sender].add(numTokens);
        BroadcastAddBalance(prePurchaseBalances[tokenOwner]);
        return prePurchaseBalances[tokenOwner];
    }
    
    function subtractPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurchaseBalances[tokenOwner] = prePurchaseBalances[msg.sender].sub(numTokens);
        BroadcastSubtractBalance(prePurchaseBalances[tokenOwner]);
        return prePurchaseBalances[tokenOwner];
    }

    function totalSupply() public view returns (uint256) {
	    return totalSupply_;
    }
    
    function setTotalSupply(uint256 newTargetTS) public returns (uint256) {
	    require(isContractOwner(msg.sender));
	    totalSupply_ = newTargetTS;
	    return totalSupply_;
    }
    
    function getCurrentPrePurchaseTargetMarketCap() public view returns (uint256) {
	    return prePurchaseTargetMarketCap_;
    }
    
    function setCurrentPrePurchaseTargetMarketCap(uint256 newTargetMC) public returns (uint256) {
	    require(isContractOwner(msg.sender));
	    prePurchaseTargetMarketCap_ = newTargetMC;
	    return prePurchaseTargetMarketCap_;
    }
    
    function getUserEthBalance() public view returns (uint256) {
        return msg.sender.balance;
    }
    
    function prePurchaseOnEthNetwork(address receiver, uint256 numTokens) public payable {
        require(numTokens <= msg.sender.balance);
        //we can turn it off
        require(prePurchaseTargetMarketCap_ != 0);
        uint256[] memory awardedTokens = PF2.calculateTokensBack(msg.value, prePurchaseTargetMarketCap_, totalSupply_);
        
        //this is the eth balance recieved...
        payable(liquidityGenAddress).transfer(msg.value);
        prePurchaseBalances[msg.sender] = prePurchaseBalances[msg.sender].add(awardedTokens[6]);
        awardedSupply_.add(awardedTokens[6]);
        emit CalcAndSent(awardedTokens[0],awardedTokens[1],awardedTokens[2],awardedTokens[3],awardedTokens[4],awardedTokens[5],awardedTokens[6]);
        emit Recieved(msg.sender, msg.value, liquidityGenAddress);
       
    }
}

library SafeMath2 { 
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