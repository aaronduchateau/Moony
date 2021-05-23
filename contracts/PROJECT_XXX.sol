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