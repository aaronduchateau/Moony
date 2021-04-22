import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from "ethers";
import PreciousChickenToken from "./contracts/PreciousChickenToken.json";
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Cards from './Cards';

const NFTData = [
	{
		1: {id: 1, parentId: null, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [20,30,10,40], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg' },
		2: {id: 2, parentId: 1, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [50,50], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg'},
		3: {id: 3, parentId: 1, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg' },
		4: {id: 4, parentId: 1, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg' },
		5: {id: 5, parentId: 1, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg' },
		6: {id: 6, parentId: 2, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg' },
		7: {id: 7, parentId: 2, topLevelId: 1, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg' },
	},
	{
		1: {id: 1, parentId: null, topLevelId: 2, title: "House of the Hill", tagNum: "#E56778", segments: [20,30,10,40], img: 'https://photos.zillowstatic.com/fp/f0dc4ad65b303f1f77aa5067a44f5733-cc_ft_1536.jpg' },
		2: {id: 2, parentId: 1, topLevelId: 2, title: "House of the Hill", tagNum: "#E56778", segments: [50,50], img: 'https://photos.zillowstatic.com/fp/f0dc4ad65b303f1f77aa5067a44f5733-cc_ft_1536.jpg'},
		3: {id: 3, parentId: 1, topLevelId: 2, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/f0dc4ad65b303f1f77aa5067a44f5733-cc_ft_1536.jpg' },
		4: {id: 4, parentId: 1, topLevelId: 2, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/f0dc4ad65b303f1f77aa5067a44f5733-cc_ft_1536.jpg' },
		5: {id: 5, parentId: 1, topLevelId: 2, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/f0dc4ad65b303f1f77aa5067a44f5733-cc_ft_1536.jpg' },
	}, 
	{
		1: {id: 1, parentId: null, topLevelId: 3, title: "House of the Hill", tagNum: "#E56778", segments: [20,30,10,40], img: 'https://photos.zillowstatic.com/fp/6180c23d544b6b579d267a99e7457131-cc_ft_1536.jpg' },
		2: {id: 2, parentId: 1, topLevelId: 3, title: "House of the Hill", tagNum: "#E56778", segments: [50,50], img: 'https://photos.zillowstatic.com/fp/6180c23d544b6b579d267a99e7457131-cc_ft_1536.jpg'},
		3: {id: 3, parentId: 1, topLevelId: 3, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/6180c23d544b6b579d267a99e7457131-cc_ft_1536.jpg' },
		4: {id: 4, parentId: 1, topLevelId: 3, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/6180c23d544b6b579d267a99e7457131-cc_ft_1536.jpg' },
		5: {id: 5, parentId: 1, topLevelId: 3, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/6180c23d544b6b579d267a99e7457131-cc_ft_1536.jpg' },
	},
	{
		1: {id: 1, parentId: null, topLevelId: 4, title: "House of the Hill", tagNum: "#E56778", segments: [20,30,10,40], img: 'https://photos.zillowstatic.com/fp/760fc6ae87a8c55a99d22608d6b51ef7-cc_ft_1536.jpg' },
		2: {id: 2, parentId: 1, topLevelId: 4, title: "House of the Hill", tagNum: "#E56778", segments: [50,50], img: 'https://photos.zillowstatic.com/fp/760fc6ae87a8c55a99d22608d6b51ef7-cc_ft_1536.jpg'  },
		3: {id: 3, parentId: 1, topLevelId: 4, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/760fc6ae87a8c55a99d22608d6b51ef7-cc_ft_1536.jpg'  },
		4: {id: 4, parentId: 1, topLevelId: 4, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/760fc6ae87a8c55a99d22608d6b51ef7-cc_ft_1536.jpg'  },
		5: {id: 5, parentId: 1, topLevelId: 4, title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/760fc6ae87a8c55a99d22608d6b51ef7-cc_ft_1536.jpg'  },
	},
	{
		1: {id: 1, parentId: null, topLevelId: 5, title: "House of the Hill", tagNum: "#E56778", segments: [20,30,10,40], img: 'https://photos.zillowstatic.com/fp/f44d2a3601efc4ab0d706e6ad8f800d0-cc_ft_1536.jpg' },
		2: {id: 2, parentId: 1, topLevelId: 5,  title: "House of the Hill", tagNum: "#E56778", segments: [50,50], img: 'https://photos.zillowstatic.com/fp/f44d2a3601efc4ab0d706e6ad8f800d0-cc_ft_1536.jpg' },
		3: {id: 3, parentId: 1, topLevelId: 5,  title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/f44d2a3601efc4ab0d706e6ad8f800d0-cc_ft_1536.jpg' },
		4: {id: 4, parentId: 1, topLevelId: 5,  title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/f44d2a3601efc4ab0d706e6ad8f800d0-cc_ft_1536.jpg' },
		5: {id: 5, parentId: 1, topLevelId: 5,  title: "House of the Hill", tagNum: "#E56778", segments: [100], img: 'https://photos.zillowstatic.com/fp/f44d2a3601efc4ab0d706e6ad8f800d0-cc_ft_1536.jpg' },
	},
];


const OWNER_ADDRESS = "0x46C52823C6cfE568b99824ae1d3201c4E6c581fC";


// Needs to change to reflect current PreciousChickenToken address
const contractAddress = '0xa8dC92bEeF9E5D20B21A5CC01bf8b6a5E0a51888';

let provider;
let erc20;
let noProviderAbort = true;

window.ethereum.on('accountsChanged', (_chainId) => window.location.reload());
window.ethereum.on('disconnect', (_chainId) => window.location.reload());

// Ensures metamask or similar installed
if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
	try {
		// Ethers.js set up, gets data from MetaMask and blockchain
		//window.ethereum.enable().then(
		//	provider = new ethers.providers.Web3Provider(window.ethereum)
		//);
		//signer = provider.getSigner();
		//erc20 = new ethers.Contract(contractAddress, PreciousChickenToken.abi, signer);
		//provider = new ethers.providers.Web3Provider(window.ethereum);
		//if(provider){
		//	setSigner(provider.getSigner());
		//		erc20 = new ethers.Contract(contractAddress, PreciousChickenToken.abi, signer);
		//}

		noProviderAbort = false;
	} catch (e) {
		noProviderAbort = true;
	}
}

function abbrevWalAdress(sha) {
	return '0x' + sha.slice(-3) + '...' + sha.slice(-3);
}

function App() {
	const baseSha = "0x00..";

	const [signer, setSigner] = useState(null);
	const [walAddress, setWalAddress] = useState(baseSha);
	const [pctBal, setPctBal] = useState(0);
	const [ethBal, setEthBal] = useState(0);
	const [coinSymbol, setCoinSymbol] = useState("Nil");
	const [transAmount, setTransAmount] = useState('0');
	const [pendingFrom, setPendingFrom] = useState('0x00');
	const [pendingTo, setPendingTo] = useState('0x00');
	const [pendingAmount, setPendingAmount] = useState('0');
	const [isPending, setIsPending] = useState(false);
	const [errMsg, setErrMsg] = useState("Transaction failed!");
	const [isError, setIsError] = useState(false);
	
	const [feedXAU, setFeedXAU] = useState(null);
	const [currentXAU, setCurrentXAU] = useState(0.00);

	// initialize methods here	
	const updatePriceFeeds = (id, setFeed, setCurrent) => {
		fetch('/coins/' + id + '/market_chart?vs_currency=usd&days=1080&interval=monthly')
		.then(response => response.json())
		.then(data => {
			setCurrent(data.prices[data.prices.length - 1][1]);
			setFeed(data);
			console.log(data.prices[data.prices.length - 1][1]);
			console.log(data) // Prints result from `response.json()`
		})
		.catch(error => console.error(error))
	}

	// hooks here
	useEffect(() => {
		//to do throttle this request by hour

		!feedXAU && updatePriceFeeds('tether-gold', setFeedXAU, setCurrentXAU);
		//updatePriceFeeds('bitcoin');
		//updatePriceFeeds('ethereum', setCurrentXAU);
	});


	
	// Aborts app if metamask etc not present
	if (noProviderAbort) {
		return (
			<div>
				<h1>Error</h1>
				<p><a href="https://metamask.io">Metamask</a> or equivalent required to access this page.</p>
			</div>
		);
	}

	try {
		// Ethers.js set up, gets data from MetaMask and blockchain
		//window.ethereum.enable().then(
		//	provider = new ethers.providers.Web3Provider(window.ethereum)
		//);
		//signer = provider.getSigner();
		//erc20 = new ethers.Contract(contractAddress, PreciousChickenToken.abi, signer);
		provider = new ethers.providers.Web3Provider(window.ethereum);
		if (provider && !signer) {
			setSigner(provider.getSigner());
			erc20 = new ethers.Contract(contractAddress, PreciousChickenToken.abi, signer);
		}

		//noProviderAbort = false;
	} catch (e) {
		console.log('something fucked up happened');
	}

	// Notification to user that transaction sent to blockchain
	const PendingAlert = () => {
		if (!isPending) return null;
		return (
			<Alert key="pending" variant="info"
				style={{ position: 'absolute', top: 0 }}>
				Blockchain event notification: transaction of {pendingAmount}
			&#x39e; from <br />
				{pendingFrom} <br /> to <br /> {pendingTo}.
			</Alert>
		);
	};

	// Notification to user of blockchain error
	const ErrorAlert = () => {
		if (!isError) return null;
		return (
			<Alert key="error" variant="danger"
				style={{ position: 'absolute', top: 0 }}>
				{errMsg}
			</Alert>
		);
	};

	if (signer) {
		// Sets current balance of PCT for user
		signer.getAddress().then(response => {
			setWalAddress(response);
			return erc20.balanceOf(response);
		}).then(balance => {
			setPctBal(balance.toString())
		});

		// Sets current balance of Eth for user
		signer.getAddress().then(response => {
			return provider.getBalance(response);
		}).then(balance => {
			let formattedBalance = ethers.utils.formatUnits(balance, 18);
			setEthBal(formattedBalance.toString())
		});

		// Sets symbol of ERC20 token (i.e. PCT)
		//async function getSymbol() {
		//	let symbol = await erc20.symbol();
		//	return symbol;
		//}
		//let symbol = getSymbol();
		//symbol.then(x => setCoinSymbol(x.toString()));
	}

	// Interacts with smart contract to buy PCT
	async function buyPCT() {
		// Converts integer as Eth to Wei,
		let amount = await ethers.utils.parseEther(transAmount.toString());
		try {
			await erc20.buyToken(transAmount, { value: amount });
			// Listens for event on blockchain
			await erc20.on("PCTBuyEvent", (from, to, amount) => {
				setPendingFrom(from.toString());
				setPendingTo(to.toString());
				setPendingAmount(amount.toString());
				setIsPending(true);
			})
		} catch (err) {
			if (typeof err.data !== 'undefined') {
				setErrMsg("Error: " + err.data.message);
			}
			setIsError(true);
		}
	}

	// Interacts with smart contract to sell PCT
	async function sellPCT() {
		try {
			await erc20.sellToken(transAmount);
			// Listens for event on blockchain
			await erc20.on("PCTSellEvent", (from, to, amount) => {
				setPendingFrom(from.toString());
				setPendingTo(to.toString());
				setPendingAmount(amount.toString());
				setIsPending(true);
			})
		} catch (err) {
			if (typeof err.data !== 'undefined') {
				setErrMsg("Error: " + err.data.message);
			}
			setIsError(true);
		}
	}

	// Sets state for value to be transacted
	// Clears extant alerts
	function valueChange(value) {
		setTransAmount(value);
		setIsPending(false);
		setIsError(false);
	}

	// Handles user buy form submit
	const handleBuySubmit = (e: React.FormEvent) => {
		e.preventDefault();
		valueChange(e.target.buypct.value);
		buyPCT();
	};

	// Handles user sell form submit
	const handleSellSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		valueChange(e.target.sellpct.value);
		sellPCT();
	};

	// Handles user sell form submit
	const handleConnectSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Ethers.js set up, gets data from MetaMask and blockchain
			window.ethereum.enable().then(() => {
				provider = new ethers.providers.Web3Provider(window.ethereum);
				setSigner(provider.getSigner());
				erc20 = new ethers.Contract(contractAddress, PreciousChickenToken.abi, signer);
			}
			);

			//noProviderAbort = false;
		} catch (e) {
			console.log(e);
			//noProviderAbort = true;
		}
	};

	let appSize = "";
	if (walAddress !== baseSha) {
		appSize = " big-app";
	}
	const isOwner = (OWNER_ADDRESS === walAddress);

	return (
		<div className={"App" + appSize}>
			<header className="App-header">
				<div className="ant-page-header-heading-title">
					GLD3
				</div>
				<form onSubmit={handleConnectSubmit}>
					<span className="connect-button-holder">
						{appSize && abbrevWalAdress(walAddress)}
						{!appSize && <Button type="submit" className="connect-button">Connect MetaMask</Button>}
					</span>
				</form>
				{appSize && <Cards NFTData={NFTData}/>}
				{!appSize && <Home currentXAU={currentXAU} feedXAU={feedXAU}/>}
				<ErrorAlert />
				<PendingAlert />
				
				
				
				
				
				<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<br/>

				<h2>{coinSymbol}</h2>

				<p>
					User Wallet address: {walAddress}<br />
		Eth held: {ethBal}<br />
		PCT held: {pctBal}<br />
				</p>

				<form onSubmit={handleBuySubmit}>
					<p>
						<label htmlFor="buypct">PCT to buy:</label>
						<input type="number" step="1" min="0" id="buypct"
							name="buypct" onChange={e => valueChange(e.target.value)} required
							style={{ margin: '12px' }} />
						<Button type="submit" >Buy PCT</Button>
					</p>
				</form>

				<form onSubmit={handleSellSubmit}>
					<p>
						<label htmlFor="sellpct">PCT to sell:</label>
						<input type="number" step="1" min="0" id="sellpct"
							name="sellpct" onChange={e => valueChange(e.target.value)} required
							style={{ margin: '12px' }} />
						<Button type="submit" >Sell PCT</Button>
					</p>
				</form>

				<a title="GitR0n1n / CC BY-SA (https://creativecommons.org/licenses/by-sa/4.0)" href="https://commons.wikimedia.org/wiki/File:Ethereum-icon-purple.svg">
					<span style={{ fontSize: '12px', color: 'grey' }}>
						Ethereum logo by GitRon1n
		</span></a>
			</header>
			<div class="admin-label">
				<div class="admin-label-sub">
					{isOwner && "God of the Chain"}
				</div>
			</div>
		</div>
	);
}

export default App;

