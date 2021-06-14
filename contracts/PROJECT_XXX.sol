pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceXUA_CL.sol";
import "./ConsumesPriceReferenceETH_CL.sol";


contract Mooney {

    string public constant name = "XXX";
    string public constant symbol = "XXX";
    uint8 public constant decimals = 18;  


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;
    mapping(uint => uint256[]) taxableThresholds;
    
    uint256 totalSupply_;
    address DAO_address;
    //this will likely just be a delegate, maybe add this to the constructor as a delegate of the DAO
    address liquidityGenAddress;

    using SafeMath for uint256;
    
    ConsumesPriceReferenceXUA_CL public PF;
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor() public {  
    	totalSupply_ = 45000000000000000;
    	DAO_address = 0x7C717f804301fe6C51F4Ec8bae9BB653Ae558F63;
    	liquidityGenAddress = 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6;
    	
    	//Assign initial token amount to the DAO
    	balances[msg.sender] = totalSupply_;
    	PF = new ConsumesPriceReferenceXUA_CL();
    	PF2 = new ConsumesPriceReferenceETH_CL();
    	
    	//initiate simple tax structure
    	taxableThresholds[0] = [3000, 0];
    	taxableThresholds[1] = [5000, 200];
    	taxableThresholds[2] = [6000, 300];
    	taxableThresholds[3] = [7000, 400];
    	taxableThresholds[4] = [8000, 500];
    	taxableThresholds[5] = [0, 600];
    }  
    
    function isContractOwner() public returns (bool) {
        return msg.sender == DAO_address;
    }

    function totalSupply() public view returns (uint256) {
	    return totalSupply_;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }
    
    function transferTaxFree(address receiver, uint numTokens) public returns (bool) {
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
        
        //tax transfer
        balances[msg.sender] = balances[msg.sender].sub(taxValues[1]);
        balances[DAO_address] = balances[DAO_address].add(taxValues[1]);
        emit Transfer(msg.sender, DAO_address, taxValues[1]);
        return true;
    }
    
    // this allows people to approve third parties to manage a percentage of their funds. 
    // The DAO (for example) could assign a portion of it's funds to a third party for management
    function approve(address delegate, uint numTokens) public returns (bool) {
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
    
    function determineTax(uint256 basis) public view returns (uint256[] memory){
        uint256[] memory results = new uint256[](2);
        if(basis < taxableThresholds[0][0]){
            // no tax for our friends who are broke
            results[0] = basis;
            results[1] = 0;
            return results;
        }
        if(basis < taxableThresholds[1][0]){
            results[0] = basis.sub(taxableThresholds[1][1]);
            results[1] = taxableThresholds[1][1];
            return results;
        }
        if(basis < taxableThresholds[2][0]){
            results[0] = basis.sub(taxableThresholds[2][1]);
            results[1] = taxableThresholds[2][1];
            return results;
        }
        if(basis < taxableThresholds[3][0]){
            results[0] = basis.sub(taxableThresholds[3][1]);
            results[1] = taxableThresholds[3][1];
            return results;
        }
        if(basis < taxableThresholds[4][0]){
            results[0] = basis.sub(taxableThresholds[4][1]);
            results[1] = taxableThresholds[4][1];
            return results;
        }
        // catches everything above the conditions above
        results[0] = basis.sub(taxableThresholds[5][1]);
        results[1] = taxableThresholds[5][1];
        return results;
    }
    
    function updateTaxableThresholds(uint256 a,uint256 b,uint256 c) public returns(bool){
        if(isContractOwner()){
            taxableThresholds[a] = [b,c];
            return true;
        }
    }
    
    //function liquidityGenerationSale(){
    //    
    //}
    
    function getPriceOfXUA() public view returns (int256) {
        return PF.getLatestPrice();
    }
    
    function getPriceOfETH() public view returns (int256) {
        return PF2.getLatestPrice();
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
}



1 eth = 1000000000000000000 wei

Assume target market cap of 30 million dollars for presale:
1000000000000000 / 30,000,000 = 33333333 Mooney = 1 dollar

assume chainlink api for ETH/USD price returns 256917152482...i.e. 
1000000000000000000 / (chainlinkValue / 10^8) = 1 wei to dollar
which means...
383499241784770 wei = one dollar 
----------------------------------------------------------------------
so with an incoming transaction of .5 ETH (500000000000000000 wei)

(1000000000000000 / 30,000,0000) x (1000000000000000 / 30,000,0000) 

500000000000000000 /*383499241784770* = value of incoming ETH in dollars
...multiplied by... 
1000000000000000 (market cap) / 30,000,000 = 33333333 Mooney

33333333 X 1303 = 43,433,332,899

one quadrillion 
1000000000000000000000000000000000

kovan address
0x9326BFA02ADD2366b30bacB125260Af641031331


wei
1000000000000000000
pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract PrePurchaseMooney {

    address owner;
    uint256 prePurchaseTargetMarketCap_;
    uint256 totalSupply_;
    mapping(address => uint256) prePurcahseBalances;
    using SafeMath for uint256;
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 500000000;
    	owner = msg.sender;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL();
    }  
    
    function getContractOwner() public returns (address) {
        return owner;
    }
    
    function isContractOwner(address potentialOwner) public returns (bool) {
        return potentialOwner == owner;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return prePurcahseBalances[tokenOwner];
    }
    
    function subtractPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurcahseBalances[tokenOwner] = prePurcahseBalances[msg.sender].sub(numTokens);
        return prePurcahseBalances[tokenOwner];
    }

    function totalSupply() public view returns (uint256) {
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
    
    function prepurchaseEthNetwork(address receiver, uint256 numTokens) public payable returns (bool) {
        require(numTokens <= msg.sender.balance);
        require(prePurchaseTargetMarketCap_ != 0);
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        // minimum purchase is 5 dollars
        require(numTokens <= numWeiInDollar.mul(5));
        
        uint256 pricePerToken = totalSupply_.div(prePurchaseTargetMarketCap_);
        uint256 pricePerWei = numTokens.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        payable(owner).transfer(numTokens);
        prePurcahseBalances[msg.sender] = prePurcahseBalances[msg.sender].add(numTokens);
        return true;
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



// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract PrePurchaseMooney {

    address owner;
    uint256 prePurchaseTargetMarketCap_;
    uint256 totalSupply_;
    mapping(address => uint256) prePurcahseBalances;
    using SafeMath for uint256;
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 500000000;
    	owner = msg.sender;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL();
    }  
    
    function getContractOwner() public view returns (address) {
        return owner;
    }
    
    function isContractOwner(address potentialOwner) public view returns (bool) {
        return potentialOwner == owner;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return prePurcahseBalances[tokenOwner];
    }
    
    function subtractPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurcahseBalances[tokenOwner] = prePurcahseBalances[msg.sender].sub(numTokens);
        return prePurcahseBalances[tokenOwner];
    }

    function totalSupply() public view returns (uint256) {
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
    
    function prePurchaseOnEthNetwork(address receiver, uint256 numTokens) public payable returns (bool) {
        require(receiver == msg.sender);
        require(numTokens <= msg.sender.balance);
        require(prePurchaseTargetMarketCap_ != 0);
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        // minimum purchase is 5 dollars
        require(numTokens <= numWeiInDollar.mul(5));
        
        uint256 pricePerToken = totalSupply_.div(prePurchaseTargetMarketCap_);
        uint256 pricePerWei = numTokens.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        payable(owner).transfer(numTokens);
        prePurcahseBalances[msg.sender] = prePurcahseBalances[msg.sender].add(awardedTokens);
        return true;
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


**********newwejsdfkshjdkjfhsdkj bew wbeew


pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract Mooney {

    string public constant name = "XXX";
    string public constant symbol = "XXX";
    uint8 public constant decimals = 18;  


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;
    mapping(uint => uint256[]) taxableThresholds;
    
    uint256 totalSupply_;
    uint256 prePurchaseTargetMarketCap_;
    address DAO_address;
    address BURN_address;
    //this will likely just be a delegate, maybe add this to the constructor as a delegate of the DAO
    address liquidityGenAddress;
    

    using SafeMath for uint256;
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 500000000;
    	DAO_address = msg.sender;
    	BURN_address = 0x000000000000000000000000000000000000dEaD;
    	liquidityGenAddress = 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6;
    	
    	//Assign initial token amount to the DAO
    	balances[msg.sender] = totalSupply_;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL();
    	
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

    function totalSupply() public view returns (uint256) {
	    return totalSupply_;
    }
    
    function getCurrentPrePurchaseTargetMarketCap() public view returns (uint256) {
	    return prePurchaseTargetMarketCap_;
    }
    
    function setCurrentPrePurchaseTargetMarketCap(uint256 newTargetMC) public returns (uint256) {
	    prePurchaseTargetMarketCap_ = newTargetMC;
	    return prePurchaseTargetMarketCap_;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
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
        balances[msg.sender] = balances[msg.sender].sub(taxValues[2]);
        balances[BURN_address] = balances[BURN_address].add(taxValues[2]);
        emit Transfer(msg.sender, DAO_address, taxValues[2]);
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
    
    function prepurchaseEthNetwork(address receiver, uint256 numTokens) public payable returns (bool) {
        require(numTokens <= msg.sender.balance);
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        // minimum purchase is 5 dollars
        require(numTokens <= numWeiInDollar.mul(5));
        
        uint256 pricePerToken = totalSupply_.div(prePurchaseTargetMarketCap_);
        uint256 pricePerWei = msg.value.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        payable(owner).transfer(msg.value);

        

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
        balances[msg.sender] = balances[msg.sender].sub(taxValues[2]);
        balances[BURN_address] = balances[BURN_address].add(taxValues[2]);
        emit Transfer(msg.sender, DAO_address, taxValues[2]);
        return true;
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




!!!!
5000000000000000 this amount will transfer!






goood prepurchase




// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract PrePurchaseMooney {

    address ownerX;
    uint256 prePurchaseTargetMarketCap_;
    uint256 totalSupply_;
    mapping(address => uint256) prePurchaseBalances;
    using SafeMath2 for uint256;
    
    
    event Recieved(address indexed sender, uint256 msgVal, address indexed ownerX);
    //emit Recieved(msg.sender, msg.value, owner, numWeiInDollar, pricePerToken, pricePerWei, awardedTokens);
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance, address chainLinkAggregatorAddress) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 350000000;
    	ownerX = msg.sender;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL(chainLinkAggregatorAddress);
    }  
    
    function getContractOwner() public view returns (address) {
        return ownerX;
    }
    
    function isContractOwner(address potentialOwner) public view returns (bool) {
        return potentialOwner == ownerX;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return prePurchaseBalances[tokenOwner];
    }
    
    function addPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurchaseBalances[tokenOwner] = prePurchaseBalances[msg.sender].add(numTokens);
        return prePurchaseBalances[tokenOwner];
    }
    
    function subtractPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurchaseBalances[tokenOwner] = prePurchaseBalances[msg.sender].sub(numTokens);
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
    
    function prePurchaseOnEthNetwork(address receiver, uint256 numTokens) public payable returns (uint256) {
        require(numTokens <= msg.sender.balance);
        require(prePurchaseTargetMarketCap_ != 0);
        // minimum purchase is 5 dollars
        //require(numTokens <= numWeiInDollar.mul(5));
        uint256 awardedTokens = PF2.calculateTokensBack(msg.value, prePurchaseTargetMarketCap_, totalSupply_);
        payable(ownerX).transfer(awardedTokens);
        emit Recieved(msg.sender, msg.value, ownerX);
        prePurchaseBalances[msg.sender] = prePurchaseBalances[msg.sender].add(awardedTokens);
        return awardedTokens;
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

good consumes price


// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorInterface.sol";

contract ConsumesPriceReferenceETH_CL {

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
        uint256 weiBase = 1000000000000000000;
        return weiBase.div(getPriceOfETH().div(100000000));
    }
    
    function calculateTokensBack(uint256 ethIn, uint256 prePurchaseTargetMarketCap,uint256 totalSupply) public returns (uint256) {
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        uint256 pricePerToken = totalSupply.div(prePurchaseTargetMarketCap);
        uint256 pricePerWei = ethIn.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        emit Calculated(numWeiInDollar, pricePerToken, pricePerWei, awardedTokens);
        return awardedTokens;
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








pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract Mooney {

    string public constant name = "XXX";
    string public constant symbol = "XXX";
    uint8 public constant decimals = 18;  


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;
    mapping(uint => uint256[]) taxableThresholds;
    
    uint256 totalSupply_;
    uint256 prePurchaseTargetMarketCap_;
    address DAO_address;
    address BURN_address;
    //this will likely just be a delegate, maybe add this to the constructor as a delegate of the DAO
    address liquidityGenAddress;
    

    using SafeMath2 for uint256;
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 500000000;
    	DAO_address = msg.sender;
    	BURN_address = 0x000000000000000000000000000000000000dEaD;
    	liquidityGenAddress = 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6;
    	
    	//Assign initial token amount to the DAO
    	balances[msg.sender] = totalSupply_;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL();
    	
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

    function totalSupply() public view returns (uint256) {
	    return totalSupply_;
    }
    
    function getCurrentPrePurchaseTargetMarketCap() public view returns (uint256) {
	    return prePurchaseTargetMarketCap_;
    }
    
    function setCurrentPrePurchaseTargetMarketCap(uint256 newTargetMC) public returns (uint256) {
	    prePurchaseTargetMarketCap_ = newTargetMC;
	    return prePurchaseTargetMarketCap_;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
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
        balances[msg.sender] = balances[msg.sender].sub(taxValues[2]);
        balances[BURN_address] = balances[BURN_address].add(taxValues[2]);
        emit Transfer(msg.sender, DAO_address, taxValues[2]);
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
    
    function prepurchaseEthNetwork(address receiver, uint256 numTokens) public payable returns (bool) {
        require(numTokens <= msg.sender.balance);
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        // minimum purchase is 5 dollars
        require(numTokens <= numWeiInDollar.mul(5));
        
        uint256 pricePerToken = totalSupply_.div(prePurchaseTargetMarketCap_);
        uint256 pricePerWei = msg.value.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        payable(owner).transfer(msg.value);

        

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
        balances[msg.sender] = balances[msg.sender].sub(taxValues[2]);
        balances[BURN_address] = balances[BURN_address].add(taxValues[2]);
        emit Transfer(msg.sender, DAO_address, taxValues[2]);
        return true;
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







// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract PrePurchaseMooney {

    address liquidityGenAddress;
    uint256 prePurchaseTargetMarketCap_;
    uint256 totalSupply_;
    mapping(address => uint256) prePurchaseBalances;
    using SafeMath2 for uint256;
    
    
    event Recieved(address indexed sender, uint256 msgVal, address indexed liquidityGenAddress);
    //emit Recieved(msg.sender, msg.value, owner, numWeiInDollar, pricePerToken, pricePerWei, awardedTokens);
    
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance, address chainLinkAggregatorAddress) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 350000000;
    	//should be liquidityGenAddress -> 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6
    	liquidityGenAddress = msg.sender;
    	
    	PF2 = new ConsumesPriceReferenceETH_CL(chainLinkAggregatorAddress);
    }  
    
    function getContractOwner() public view returns (address) {
        return liquidityGenAddress;
    }
    
    function isContractOwner(address potentialOwner) public view returns (bool) {
        return potentialOwner == liquidityGenAddress;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return prePurchaseBalances[tokenOwner];
    }
    
    function addPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurchaseBalances[tokenOwner] = prePurchaseBalances[msg.sender].add(numTokens);
        return prePurchaseBalances[tokenOwner];
    }
    
    function subtractPrePurchaseBalanceOf(address tokenOwner, uint256 numTokens) public returns (uint) {
        require(isContractOwner(msg.sender));
        prePurchaseBalances[tokenOwner] = prePurchaseBalances[msg.sender].sub(numTokens);
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
    
    function prePurchaseOnEthNetwork(address receiver, uint256 numTokens) public payable returns (uint256) {
        require(numTokens <= msg.sender.balance);
        require(prePurchaseTargetMarketCap_ != 0);
        // minimum purchase is 5 dollars
        //require(numTokens <= numWeiInDollar.mul(5));
        uint256 awardedTokens = PF2.calculateTokensBack(msg.value, prePurchaseTargetMarketCap_, totalSupply_);
        //this is the eth balance recieved...
        payable(liquidityGenAddress).transfer(msg.value);
        emit Recieved(msg.sender, msg.value, liquidityGenAddress);
        prePurchaseBalances[msg.sender] = prePurchaseBalances[msg.sender].add(awardedTokens);
        return awardedTokens;
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



// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorInterface.sol";

contract ConsumesPriceReferenceETH_CL {

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
        uint256 weiBase = 1000000000000000000;
        return weiBase.div(getPriceOfETH().div(100000000));
    }
    
    function calculateTokensBack(uint256 ethIn, uint256 prePurchaseTargetMarketCap,uint256 totalSupply) public returns (uint256) {
        uint256 numWeiInDollar = getNumberOfWeiInDollar();
        uint256 pricePerToken = totalSupply.div(prePurchaseTargetMarketCap);
        uint256 pricePerWei = ethIn.div(numWeiInDollar);
        uint256 awardedTokens = pricePerWei.mul(pricePerToken);
        emit Calculated(numWeiInDollar, pricePerToken, pricePerWei, awardedTokens);
        return awardedTokens;
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



pragma solidity ^0.6.7;
import "./ConsumesPriceReferenceETH_CL.sol";

contract Mooney {

    string public constant name = "XXX";
    string public constant symbol = "XXX";
    uint8 public constant decimals = 18;  
    


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Recieved(address indexed sender, uint256 msgVal, address indexed DAO_address);


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
    constructor(uint256 startingBalance, address chainLinkAggregatorAddress) public {  
    	totalSupply_ = startingBalance;
    	prePurchaseTargetMarketCap_ = 500000000;
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
    
    function balanceOf(address tokenOwner) public view returns (uint) {
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
            address burnOrMint = BURN_address; 
            totalSupply_.sub(taxValues[2]);
        } else {
            address burnOrMint = liquidityGenAddress; 
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
        uint256 awardedTokens = PF2.calculateTokensBack(msg.value, prePurchaseTargetMarketCap_, totalSupply_);
        payable(liquidityGenAddress).transfer(msg.value);
        balances[msg.sender] = balances[msg.sender].add(awardedTokens);
        totalSupply_ = totalSupply_ + awardedTokens;
        emit Recieved(msg.sender, msg.value, DAO_address);
        //prePurchaseBalances[msg.sender] = prePurchaseBalances[msg.sender].add(awardedTokens);
        return awardedTokens;
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
