import React, { useState, useEffect } from 'react';

import './App.css';
import { ethers } from "ethers";
import PreciousChickenToken from "./contracts/PreciousChickenToken.json";
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home2 from './Home2';
import Cards from './Cards';
import Modal from './Modal'
import Security from './Security'
import {
	BrowserRouter as Router,
	Switch,
	useLocation,
	useHistory,
	BrowserHistory,
  } from "react-router-dom";

const NFTData  = [
  {
        'id': 'PQ4352',
          'artistName': "Luca",
        'pieceName': "Mooney Moon Bum",
        'imgId': "nftImages/BumMoon.png",
        'imgDesc': "As the moon gazes down upon you it’s bum wiggles hello.",
        'ethPrice': "0.544",
        'bnbPrice': "2.470",
		'usdPrice': "657",
    },
	{
        'id': 'EG3923',
          'artistName': "Tom JONES",
        'pieceName': "Mooney's Holdup",
        'imgId': "nftImages/MooneyHoldup.png",
        'imgDesc': "This man needs the price of $MOONEY to pump, he has to feed his family some how.",
        'ethPrice': "0.949", 
        'bnbPrice': "4.312",
		'usdPrice': "2309",
    },
  {
        'id': 'GR9201',
          'artistName': "Vlad",
        'pieceName': "Wagmi x Mooney",
        'imgId': "nftImages/WAGMIXMOONEY.png",
        'imgDesc': "Mooney may be the love child of the WAGMI Think Tank and Vlad, some say Mooney has Vlad’s eyes.",
        'ethPrice': "0.848",
        'bnbPrice': "3.850",
		'usdPrice': "2086",
    },
  {
        'id': 'PR9323',
          'artistName': "Pepe Saiyan",
        'pieceName': "Keep the Secret",
        'imgId': "nftImages/KeepTheSecret.png",
        'imgDesc': "agent#112341211 found a rogue NASA employee looking at MooneyHQ, no one can know Mooney is on the Moon.",
        'ethPrice': "0.698",
        'bnbPrice': "3.168",
		'usdPrice': "2.470",
    },
  {
        'id': 'SR3432',
          'artistName': "Tom JONES",
        'pieceName': "Go Figure",
        'imgId': "nftImages/GoFigure.png",
        'imgDesc': "When Mooney’s are asked how they got to the Moon before everyone else they just shrug and say “Go Figure”.",
        'ethPrice': "1.842",
        'bnbPrice': "8.366",
		'usdPrice': "1722",
    },
  {
        'id': 'PR2333',
          'artistName': "Luca",
        'pieceName': "Retro Fashion",
        'imgId': "nftImages/RetroFashion.png",
        'imgDesc': "Since the beginning Mooney has lived on the Moon, fashion hasn’t changed much all that matters is the bum.",
        'ethPrice': "0.248",
        'bnbPrice': "1.124",
		'usdPrice': "612",
    },
  {
        'id': 'SK9309',
          'artistName': "WAGMI",
        'pieceName': "Man Laying Egg",
        'imgId': "nftImages/DaneLaysEgg.png",
        'imgDesc': "Man laying a massive egg. The Man came first.",
        'ethPrice': "0.257",
        'bnbPrice': "1.168",
		'usdPrice': "634",
    },
  {
        'id': 'NJ4532',
          'artistName': "Tom JONES",
        'pieceName': "When You’re Long On Mooney",
        'imgId': "nftImages/CoolLongMooney.png",
        'imgDesc': "Confident moonchad smoking a ciggie knowing Mooney will make him rich.",
        'ethPrice': "0.306",
        'bnbPrice': "1.390",
		'usdPrice': "2.470",
    },
  {
        'id': 'TY3493',
          'artistName': "Granola",
        'pieceName': "Space Bums",
        'imgId': "nftImages/BumInSpace.png",
        'imgDesc': "Women submitting their behinds to the powerful moon in the sky.",
        'ethPrice': "0.349",
        'bnbPrice': "1.582",
		'usdPrice': "755",
    },
  {
        'id': 'GH9023',
          'artistName': "Pepe Saiyan",
        'pieceName': "Drake Prefers Mooney",
        'imgId': "nftImages/DrakeLikesMooney.png",
        'imgDesc': "Drake expressing his exquisite taste for Mooney.",
        'ethPrice': "0.303",
        'bnbPrice': "1.374",
		'usdPrice': "747",
    },
  {
        'id': 'KJ1390',
          'artistName': "Pepe Saiyan",
        'pieceName': "The Average Mooney Holder",
        'imgId': "nftImages/200IQ.png",
        'imgDesc': "A visual description comparing Mooney Holders to other moon tokens.",
        'ethPrice': "0.264",
        'bnbPrice': "1.198",
		'usdPrice': "651",
    },
  {
        'id': 'KS2834',
          'artistName': "Terpie",
        'pieceName': "WAGMI Mooning The Internet",
        'imgId': "nftImages/BigAssMoon.png",
        'imgDesc': "WAGMI breaks the internet by mooning the cameraman.",
        'ethPrice': "0.394",
        'bnbPrice': "1.788",
		'usdPrice': "972",
    },
  {
        'id': 'JS3892',
          'artistName': "Terpie",
        'pieceName': "Jiggle",
        'imgId': "nftImages/jigJIG.png",
        'imgDesc': "The main object of attraction is the bum if it is round like a moon it makes .",
        'ethPrice': "0.529",
        'bnbPrice': "2.400",
		'usdPrice': "1314",
    },
  {
        'id': 'NE2093',
          'artistName': "Tom JONES",
        'pieceName': "Moon Cheeks",
        'imgId': "nftImages/MoonCheeks.png",
        'imgDesc': "Cheeks made out of moon? Cheese?.",
        'ethPrice': "0.181",
        'bnbPrice': "0.822",
		'usdPrice': "449",
    },
  {
        'id': 'QE3490',
          'artistName': "Terpie",
        'pieceName': "Freq Fox",
        'imgId': "nftImages/Freq_Fox.jpg",
        'imgDesc': "Inspired by the music of ST4RFOX.",
        'ethPrice': "5.286",
        'bnbPrice': "24.012",
		'usdPrice': "13147",
    },
  {
        'id': '54JASN',
          'artistName': "Terpie",
        'pieceName': "Warp of the Roses",
        'imgId': "nftImages/Warp_or_the_Roses.jpg",
        'imgDesc': "created from original Acyrilic painting.",
        'ethPrice': "3.084",
        'bnbPrice': "14.000",
		'usdPrice': "7666",
    },
      {
        'id': '93ASNL',
          'artistName': "Terpie",
        'pieceName': "Street Signs",
        'imgId': "nftImages/Street_Signs.jpg",
        'imgDesc': "Which Road will you choose on this long Tripp.......",
        'ethPrice': "3.965",
        'bnbPrice': "18.025",
		'usdPrice': "9856",
    },
      {
        'id': '88INOA',
          'artistName': "Terpie",
        'pieceName': "Tetra-Colored Summer",
        'imgId': "nftImages/Tetra-ColoredSummer.jpg",
        'imgDesc': "Digital work inspired by original painting using acyrilic pour technique.",
        'ethPrice': "6.889",
        'bnbPrice': "31.280",
		'usdPrice': "17124",
    },
      {
        'id': 'BS6969',
          'artistName': "Terpie",
        'pieceName': "Prismatic Side of The Moon",
        'imgId': "nftImages/PrismaticSideofTheMoon.jpg",
        'imgDesc': "Shifting light to sides of each story, continually showing the way throughout time and space.",
        'ethPrice': "3.798",
        'bnbPrice': "17.242",
		'usdPrice': "9441",
    },
      {
        'id': 'TP4201',
          'artistName': "Terpie",
        'pieceName': "Digtal Gander",
        'imgId': "nftImages/DigtalGander.jpg",
        'imgDesc': "Take a long Gander at this beautiful digital world. Made from originally acrylic painting.",
        'ethPrice': "2.204",
        'bnbPrice': "10.004",
		'usdPrice': "5568",
    },
      {
        'id': 'PS2020',
          'artistName': "Pepe Saiyan",
        'pieceName': "Majik Mooney",
        'imgId': "nftImages/MajikMooney.png",
        'imgDesc': "Majik kicks ass and thats what Mooney is all about.",
        'ethPrice': "0.925",
        'bnbPrice': "4.200",
		'usdPrice': "2299",
    },
      {
        'id': 'BS2021',
          'artistName': "Tom JONES",
        'pieceName': "$MOONEY",
        'imgId': "nftImages/Mmmooney.png",
        'imgDesc': "Why would you own anything else?",
        'ethPrice': "7.628",
        'bnbPrice': "34.630",
		'usdPrice': "18961",
    },
      {
        'id': 'QS2023',
          'artistName': "Pepe Saiyan",
        'pieceName': "Jeselon",
        'imgId': "nftImages/Jeselon.png",
        'imgDesc': "He is unlikely to be our saviour, but there is little point not offering him a prayer in return for a tweet.",
        'ethPrice': "1.119",
        'bnbPrice': "5.082",
		'usdPrice': "2796",
    },

];



const OWNER_ADDRESS = "0x46C52823C6cfE568b99824ae1d3201c4E6c581fC";


// Needs to change to reflect current PreciousChickenToken address
const contractAddress = '0xa8dC92bEeF9E5D20B21A5CC01bf8b6a5E0a51888';

let provider;
let erc20;
window.noProviderAbort = true;

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
		window.ethereum.on('accountsChanged', (_chainId) => window.location.reload());
		window.ethereum.on('disconnect', (_chainId) => window.location.reload());
		window.ethereum.on('networkChanged', (_chainId) => window.location.reload());

		window.noProviderAbort = false;
	} catch (e) {
		window.noProviderAbort = true;
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
	const [networkId, setNetworkId] = useState(null);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isTeamOpen, setTeamOpen] = useState(false);
	const [payState, setPayState] = useState(0);
	const [activeCard, setActiveCard] = useState(null);
	const [transactionHash, setTransactionHash] = useState(null);

	const [isDownloadMetaOpen, setDownloadMetaOpen] = useState(false);
	const [isTootOpen, setTootOpen] = useState(false);
	
	const [feedXAU, setFeedXAU] = useState(null);
	const [currentXAU, setCurrentXAU] = useState(0.00);

	const location = useLocation();
	const history = useHistory();


	function payWithMetamask(e,card) {
		if(e && card){
			e.preventDefault();
			e.stopPropagation();
			setActiveCard(card);
		}

		if (payState === 0) {
			setPayState(1);
			return;
		}
		if (payState === 2){
			managePayWithMetamask();
		}
		
	}

	async function managePayWithMetamask() {
		const networkIsEth = networkId === 1;
		const networkIsBsc = networkId === 56;
		//sets up testnet
		const networkIsKoven = networkId === 42;

		
		console.log(activeCard);
		console.log(networkId);
		
		let price = '';
		if(networkIsEth || networkIsKoven){
		price = activeCard.ethPrice;
		}
		if(networkIsBsc){
		price = activeCard.bnbPrice;
		}

		let ethereum = window.ethereum;


		// Request account access if needed
		await ethereum.enable();


		let provider = new ethers.providers.Web3Provider(ethereum);

		// Acccounts now exposed
		const params = [{
			from: window.walAddress,
			to: "0x8EcE6938bEC69DD1494746b190a1123E99EC0B91",
			value: ethers.utils.parseUnits(price, 'ether').toHexString()
		}];

		const transactionHash = await provider.send('eth_sendTransaction', params);
		setTransactionHash(transactionHash);
		setPayState(4);
		console.log('transactionHash is ' + transactionHash);
	}
    //console.log(location.pathname);

	// initialize methods here	
	/*
	const updatePriceFeeds = (id, setFeed, setCurrent) => {
		fetch('/coins/' + id + '/market_chart?vs_currency=usd&days=1080&interval=monthly')
		.then(response => response.json())
		.then(data => {
			setCurrent(data.prices[data.prices.length - 1][1]);
			setFeed(data);
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
	*/

	useEffect(() => {
		if(payState === 2){
			payWithMetamask();
		}
	},[payState]);



	
	// Aborts app if metamask etc not present
	//if (noProviderAbort) {
	//	return (
	//		<div>
	//			<h1>Error</h1>
	//			<p><a href="https://metamask.io">Metamask</a> or equivalent required to access this page.</p>
	//		</div>
	//	);
	//}

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
			window.walAddress = response;
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
			setNetworkId(signer.provider.network.chainId);
		});

		//console.log(signer.provider.network);

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

	// Handles fox close
	const handleDownloadFoxClose = (e: React.FormEvent) => {
		setDownloadMetaOpen(false);
	};

	// Handles user sell form submit
	const handleConnectSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if ((typeof window.web3 === 'undefined')){
			setDownloadMetaOpen(true);
			return;
		}
		


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
	const networkIsEth = networkId === 1;
	const networkIsBsc = networkId === 56;



	return (
		
		<div className={"App" + appSize}>
			
			{location.pathname !== "/" && <div className="moon-back"/>}
			{isDownloadMetaOpen && <Modal onClose={()=>{setPayState(0)}}>
				<h2>It looks like you don't<br/> have fox powers yet</h2>
				<img src="./fox.svg" width="200px" />
				<p style={{padding: '15px'}}>Download your Metamask wallet to pre-purchase our NFT's</p>
				<Button type="submit" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank" className="connect-button">Download MetaMask</Button>
			</Modal>}	
			{payState === 1 && <Modal onClose={()=>{setPayState(0)}}>
				<h2>Send Exactly</h2>
				{activeCard.ethPrice} ETH<br/>
				or<br/>
				{activeCard.bnbPrice} BNB <br/>
				or<br/>
				{activeCard.usdPrice} USD<br/>
				to<br/>
				0x8EcE6938bEC69DD1494746b190a1123E99EC0B91
				<br/>
				<br/>
				<h2>- Or -</h2>
				<br/>
				<img src="./fox.svg" width="50px" /> &nbsp;&nbsp;
				<Button type="submit" onClick={()=>{setPayState(2)}} className="connect-button">Pay With MetaMask</Button>
			</Modal>}	
			{payState === 2 && <Modal onClose={()=>{setPayState(0)}}>
				<h2>Attempting to Launch Fox</h2>
				<img src="./fox.svg" width="150px" /><br/>
				<br/>
				If Metamask doesn't launch, it may be because you already have a transaction Launched. Try manually opening the extension...
			</Modal>}	
			{payState === 4 && <Modal onClose={()=>{setPayState(0)}}>
				<h2>Success!</h2>
				<img src="./fox.svg" width="150px" /><br/>
				<br/>
				Your NFT has been pre-ordered!<br/>
				Please save your transaction hash for reference later.<br/>
				{transactionHash}

			</Modal>}
			
			<header className="App-header">
			<nav className="sc-bqyKva ehfErK">
				<div onClick={()=>{setMenuOpen(!isMenuOpen);setTootOpen(true);}} className="menu-trig">
				<div className="toot-holder"> <img src={isTootOpen ? './toot_over.png' : './toot_under.png'} className="toot-img"/></div>
				</div>
				{isMenuOpen && <Modal onClose={()=>{setMenuOpen(false)}}>
					<ul className="sc-fodVxV cYLuAZ">
					<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/">Home</a></li>
					<li className="sc-fFubgz bjNVbG"><a id="nav-link" onClick={()=>{setMenuOpen(false);setTeamOpen(true);}} >Meet Our Team</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/nfts">NFT Presale</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/roadmap">Roadmap</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="./Mooney_Lightpaper_v1.1.pdf">Moon Paper</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="./is-security">Are most MOON tokens Securities?</a></li>
						
					</ul>
				</Modal>}
				{isTeamOpen && <Modal onClose={()=>{setTeamOpen(false)}}>
					<img src="./teampics.png" width="530px"/>
				</Modal>}
			</nav>
			
				<div className="ant-page-header-heading-title" onClick={()=>{setMenuOpen(!isMenuOpen);setTootOpen(true);}}>
					MOONEY 
				</div>
				
				<form onSubmit={handleConnectSubmit}>
					<span className="connect-button-holder">
						{appSize && abbrevWalAdress(walAddress)}
						{!appSize && <Button type="submit" className="connect-button">Connect MetaMask</Button>}
					</span>
				</form>
			<Container>
				{location.pathname === "/nfts" && <Cards NFTData={NFTData} handleConnectSubmit={handleConnectSubmit} networkId={networkId} payWithMetamask={payWithMetamask}/>}
				{location.pathname === "/" && <Home2 currentXAU={currentXAU} feedXAU={feedXAU} setMenuOpen={setMenuOpen} setTeamOpen={setTeamOpen}/>}
				{location.pathname === "/is-security" && <Security />}
			
				{location.pathname === "/are-you-sure-its-a-joke" && <div>
					<br/><br/><br/>
					<h2 class="glow-purp">Clearly this is all<br/> a big joke...<br/>...or is it?</h2>
					<br/><br/>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/hLyz_G6vG8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					<br/><br/>
					</div>}
				<ErrorAlert />
				<PendingAlert />
				
				
				{location.pathname === "/roadmap" &&
				<Row><Col md="12" style={{marginTop: '30px'}}>
				<img src="./roadmap.png" className="icon-image-main-roadmap" />
				</Col></Row>}
				{location.pathname === "/collaborators" &&
				<div><br/><br/><br/>
					<h2 style={{textAlign: 'left'}}>Space Fund</h2>
					<p style={{textAlign: 'left'}}>Spacefund venture capital - "funding the future"</p>
					<img src="./sponser2.png" style={{marginTop: '10px'}} className="icon-image-main-roadmap" />
					<h2>&nbsp;</h2>
					<h2 style={{textAlign: 'left'}}>Arra Gloabl Summit</h2>
					<p style={{textAlign: 'left'}}> Intimate gatherings for expectional people - October 14th - 17th 2021</p>
					<img src="./sponser1.png" style={{marginTop: '10px'}} className="icon-image-main-roadmap" />
					<h2>&nbsp;</h2>
					<h2 style={{textAlign: 'left'}}>Copernic Space</h2>
					<p style={{textAlign: 'left'}}>DEMOCRATIZING ACCESS TO SPACE ASSETS</p>
				<img src="./sponser3.jpeg" style={{marginTop: '10px'}} className="icon-image-main-roadmap" />
				<h2>&nbsp;</h2>
				<h2 style={{textAlign: 'left', marginTop: '120px'}}>Wagmi Thinktank</h2>
					<p style={{textAlign: 'left'}}>Stupid memes in the front, big ideas in the back.</p>
				<img src="./wagmi-think-tank.jpg" style={{marginTop: '10px'}} className="icon-image-main-roadmap" />
				</div>}
				
				
				<br/>
				<br/>

				
					<span style={{ fontSize: '45px', color: 'white' }}>
						*Mooney is Powered by the Wagmi Thinktank
						 <br />
						 <h2 style={{color: '#49ff18'}}>we'll try to build a cooler footer soon...</h2>
						<br/><br/>
						
				<br/>
		</span>
			</Container>
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

