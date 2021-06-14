// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETHfinal.sol";

contract Mooney {

    string public constant name = "MOONEY";
    string public constant symbol = "MOONEY";
    uint8 public constant decimals = 18;  
    


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Recieved(address indexed sender, uint256 msgVal, address indexed DAO_address);
    event CalcAndSent(uint256 one, uint256 two,uint256 three,uint256 four,uint256 five,uint256 six,uint256 seven);
    event BroadcastUserBalance(uint one);

    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;
    mapping(uint => uint256[]) taxableThresholds;
    
    uint256 totalSupply_;
    uint256 prePurchaseTargetMarketCap_;
    bool defaultBurnOnTransaction_;
    address DAO_address;
    address BURN_address;
    //this will likely just be a delegate, maybe add this to the constructor as a delegate of the DAO
    address liquidityGenAddress;
    

    using SafeMath2 for uint256;
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    //bsc testnet should be 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526
    //1000000000000000000000000000000000 totalSupply
    constructor(uint256 startingBalance, address chainLinkAggregatorAddress) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 35000000;
    	DAO_address = msg.sender;
    	BURN_address = 0x000000000000000000000000000000000000dEaD;
    	liquidityGenAddress = 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6;
    	defaultBurnOnTransaction_ = true;
    	
    	//Assign initial token amount to the DAO
    	balances[msg.sender] = totalSupply_;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL(chainLinkAggregatorAddress);
    	
    	//initiate simple tax structure
    	taxableThresholds[0] = [3000, 0, 3, 0, 0, 0];
    	taxableThresholds[1] = [5000, 1, 3, 0, 0, 0];
    	taxableThresholds[2] = [6000, 1, 3, 0, 0, 0];
    	taxableThresholds[3] = [7000, 1, 3, 0, 0, 0];
    	taxableThresholds[4] = [800000000, 1, 3, 0, 0, 0];
    	taxableThresholds[5] = [0, 2, 6, 0, 0, 0];
    }  
    
    function getContractOwner() public returns (address) {
        return DAO_address;
    }
    
    function isContractOwner(address potentialOwner) public returns (bool) {
        return potentialOwner == DAO_address;
    }
    
    function isLiquidityContractOwner(address potentialOwner) public returns (bool) {
        return potentialOwner == liquidityGenAddress;
    }

    function totalSupply() public view returns (uint256) {
	    return totalSupply_;
    }
    
    function getCurrentPrePurchaseTargetMarketCap() public view returns (uint256) {
	    return prePurchaseTargetMarketCap_;
    }
    
    function setAmountToMint(uint256 amountToMint) public returns (uint256) {
        require(isLiquidityContractOwner(msg.sender));
	    balances[liquidityGenAddress] = balances[liquidityGenAddress].add(amountToMint);
	    totalSupply_.add(amountToMint);
	    return balances[liquidityGenAddress];
    }
    
    function setAmountToBurn(uint256 amountToBurn) public returns (uint256) {
        require(isLiquidityContractOwner(msg.sender));
	    balances[BURN_address] = balances[BURN_address].add(amountToBurn);
	    totalSupply_.sub(amountToBurn);
	    return balances[liquidityGenAddress];
    }
    
    function setDefaultBurnOnTransaction(bool toggleBool) public returns (bool) {
        require(isLiquidityContractOwner(msg.sender));
        defaultBurnOnTransaction_ = toggleBool;
    }
    
    function setCurrentPrePurchaseTargetMarketCap(uint256 newTargetMC) public returns (uint256) {
        require(isContractOwner(msg.sender));
	    prePurchaseTargetMarketCap_ = newTargetMC;
	    return prePurchaseTargetMarketCap_;
    }
    
    function balanceOf(address tokenOwner) public returns (uint) {
        emit BroadcastUserBalance(balances[tokenOwner]);
        return balances[tokenOwner];
    }
    
    function transferTaxFree(address receiver, uint numTokens) public returns (bool) {
        require(isContractOwner(msg.sender));
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function transfer(address receiver, uint256 numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        //where taxValues[0] is the primary transfer balance and taxValues[1] is the tax
        uint256[] memory taxValues = determineTax(numTokens);
        //primary transfer
        balances[msg.sender] = balances[msg.sender].sub(taxValues[0]);
        balances[receiver] = balances[receiver].add(taxValues[0]);
        emit Transfer(msg.sender, receiver, taxValues[0]);
        
        //tax transfer DAO
        balances[msg.sender] = balances[msg.sender].sub(taxValues[1]);
        balances[DAO_address] = balances[DAO_address].add(taxValues[1]);
        emit Transfer(msg.sender, DAO_address, taxValues[1]);
        
        //tax transfer Burn
        address burnOrMint;
        if(defaultBurnOnTransaction_){
            burnOrMint = BURN_address; 
            totalSupply_.sub(taxValues[2]);
        } else {
            burnOrMint = liquidityGenAddress; 
            totalSupply_.add(taxValues[2]);
        }
        balances[msg.sender] = balances[msg.sender].sub(taxValues[2]);
        balances[burnOrMint] = balances[burnOrMint].add(taxValues[2]);
       
        emit Transfer(msg.sender, burnOrMint, taxValues[2]);
        return true;
    }
    // this allows people to approve third parties to manage a percentage of their funds. 
    // The DAO (for example) could assign a portion of it's funds to a third party for management
    function approve(address delegate, uint numTokens) public returns (bool) {
        require(isContractOwner(msg.sender));
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }
    
    
    // this returns the amount of your funds you allowed someone to delegate
    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }

    //this is transferFunction which is from a delegate and does not include a tax
    function transferFrom(address owner, address buyer, uint256 numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);    
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
    
    function getTaxFee(uint256 amount, uint256 tax) public pure returns (uint256) {
        return amount.mul(tax.div(10**2));
    }
    
    function determineTax(uint256 basis) public view returns (uint256[] memory){
        uint256[] memory results = new uint256[](4);
        if (basis < taxableThresholds[0][0]){
            // no tax for our friends who are broke
            results[1] = 0;
            if (taxableThresholds[0][5] == 1) {
                // fixed fee 
                results[2] = taxableThresholds[0][4];
            } else {
                // dynamic fee 
                results[2] = getTaxFee(taxableThresholds[0][2], basis);
            }
            results[0] = basis.sub(results[2]);
            return results;
        }
        if (basis < taxableThresholds[1][0]){
            if (taxableThresholds[1][5] == 1) {
                // fixed fee 
                results[1] = taxableThresholds[1][3];
                results[2] = taxableThresholds[1][4];
            } else {
                // dynamic fee 
                results[1] = getTaxFee(taxableThresholds[1][1], basis);
                results[2] = getTaxFee(taxableThresholds[1][2], basis);
            }
            results[0] = basis.sub(results[2]).sub(results[1]);
            return results;
        }
        if (basis < taxableThresholds[2][0]){
            if (taxableThresholds[2][5] == 1) {
                // fixed fee 
                results[1] = taxableThresholds[2][3];
                results[2] = taxableThresholds[2][4];
            } else {
                // dynamic fee 
                results[1] = getTaxFee(taxableThresholds[2][1], basis);
                results[2] = getTaxFee(taxableThresholds[2][2], basis);
            }
            results[0] = basis.sub(results[2]).sub(results[1]);
            return results;
        }
        if (basis < taxableThresholds[3][0]){
            if (taxableThresholds[3][5] == 1) {
                // fixed fee 
                results[1] = taxableThresholds[3][3];
                results[2] = taxableThresholds[3][4];
            } else {
                // dynamic fee 
                results[1] = getTaxFee(taxableThresholds[3][1], basis);
                results[2] = getTaxFee(taxableThresholds[3][2], basis);
            }
            results[0] = basis.sub(results[2]).sub(results[1]);
            return results;
        }
        if (basis < taxableThresholds[4][0]){
            if (taxableThresholds[4][5] == 1) {
                // fixed fee 
                results[1] = taxableThresholds[4][3];
                results[2] = taxableThresholds[4][4];
            } else {
                // dynamic fee 
                results[1] = getTaxFee(taxableThresholds[4][1], basis);
                results[2] = getTaxFee(taxableThresholds[4][2], basis);
            }
            results[0] = basis.sub(results[2]).sub(results[1]);
            return results;
        }
        // catches everything above the conditions above
        if (taxableThresholds[5][5] == 1) {
            // fixed fee 
            results[1] = taxableThresholds[5][3];
            results[2] = taxableThresholds[5][4];
        } else {
            // dynamic fee 
            results[1] = getTaxFee(taxableThresholds[5][1], basis);
            results[2] = getTaxFee(taxableThresholds[5][2], basis);
        }
        results[0] = basis.sub(results[2]).sub(results[1]);
        return results;
        
    }
    
    function updateTaxableThresholdsAtIndex(uint256 indexToMod, uint256 thresHoldFixed, uint256 taxPerc, uint256 burnPerc, uint256 taxFixed, uint256 burnFixed, uint256 isFixed) public payable returns(bool){
        if(isContractOwner(msg.sender)){
            taxableThresholds[indexToMod] = [thresHoldFixed, taxPerc, burnPerc, taxFixed, burnFixed, isFixed];
            return true;
        }
    }
    
    function getPriceOfETH() public view returns (uint256) {
        return uint256(PF2.getLatestPrice());
    }
    
    function getNumberOfWeiInDollar() public view returns (uint256) {
        uint256 weiBase = 1000000000000000000;
        return weiBase.div(getPriceOfETH().div(100000000));
    }
    
    function getUserEthBalance() public payable returns (uint256) {
        return msg.sender.balance;
    }
    
    function prePurchaseOnEthNetwork(address receiver, uint256 numTokens) public payable returns (uint256) {
        require(numTokens <= msg.sender.balance);
        require(prePurchaseTargetMarketCap_ != 0);
        // minimum purchase is 5 dollars
        //require(numTokens <= numWeiInDollar.mul(5));
        uint256[] memory awardedTokens = PF2.calculateTokensBack(msg.value, prePurchaseTargetMarketCap_, totalSupply_);
        payable(liquidityGenAddress).transfer(msg.value);
        balances[msg.sender] = balances[msg.sender].add(awardedTokens[6]);
        totalSupply_ = totalSupply_ + awardedTokens[6];
        emit Recieved(msg.sender, msg.value, DAO_address);
        emit CalcAndSent(awardedTokens[0],awardedTokens[1],awardedTokens[2],awardedTokens[3],awardedTokens[4],awardedTokens[5],awardedTokens[6]);
        //prePurchaseBalances[msg.sender] = prePurchaseBalances[msg.sender].add(awardedTokens);
        //return awardedTokens;
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