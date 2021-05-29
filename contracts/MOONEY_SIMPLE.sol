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
    address BURN_address;
    //this will likely just be a delegate, maybe add this to the constructor as a delegate of the DAO
    address liquidityGenAddress;
    

    using SafeMath for uint256;
    
    ConsumesPriceReferenceXUA_CL public PF;
    ConsumesPriceReferenceETH_CL public PF2;

    //Constructur takes arguement of total tokens
    constructor(uint256 startingBalance) public {  
    	totalSupply_ = startingBalance;
    	DAO_address = msg.sender;
    	BURN_address = 0x000000000000000000000000000000000000dEaD;
    	liquidityGenAddress = 0xD8bD4C443B0b96f4d7aE6035a247f200AF34FdA6;
    	
    	//Assign initial token amount to the DAO
    	balances[msg.sender] = totalSupply_;
    	PF = new ConsumesPriceReferenceXUA_CL();
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