import React, { useState, useEffect } from 'react';

import './App.css';
import { ethers } from "ethers";
import PreciousChickenToken from "./contracts/PreciousChickenToken.json";
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Cards from './Cards';
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
    },
	{
        'id': 'EG3923',
          'artistName': "Tom JONES",
        'pieceName': "Mooney's Holdup",
        'imgId': "nftImages/MooneyHoldup.png",
        'imgDesc': "This man needs the price of $MOONEY to pump, he has to feed his family some how.",
        'ethPrice': "0.949",
        'bnbPrice': "4.312",
    },
  {
        'id': 'GR9201',
          'artistName': "Vlad",
        'pieceName': "Wagmi x Mooney",
        'imgId': "nftImages/WAGMIXMOONEY.png",
        'imgDesc': "Mooney may be the love child of the WAGMI Think Tank and Vlad, some say Mooney has Vlad’s eyes.",
        'ethPrice': "0.848",
        'bnbPrice': "3.850",
    },
  {
        'id': 'PR9323',
          'artistName': "Pepe Saiyan",
        'pieceName': "Keep the Secret",
        'imgId': "nftImages/KeepTheSecret.png",
        'imgDesc': "agent#112341211 found a rogue NASA employee looking at MooneyHQ, no one can know Mooney is on the Moon.",
        'ethPrice': "0.698",
        'bnbPrice': "3.168",
    },
  {
        'id': 'SR3432',
          'artistName': "Tom JONES",
        'pieceName': "Go Figure",
        'imgId': "nftImages/GoFigure.png",
        'imgDesc': "When Mooney’s are asked how they got to the Moon before everyone else they just shrug and say “Go Figure”.",
        'ethPrice': "1.842",
        'bnbPrice': "8.366",
    },
  {
        'id': 'PR2333',
          'artistName': "Luca",
        'pieceName': "Retro Fashion",
        'imgId': "nftImages/RetroFashion.png",
        'imgDesc': "Since the beginning Mooney has lived on the Moon, fashion hasn’t changed much all that matters is the bum.",
        'ethPrice': "0.248",
        'bnbPrice': "1.124",
    },
  {
        'id': 'SK9309',
          'artistName': "WAGMI",
        'pieceName': "Man Laying Egg",
        'imgId': "nftImages/DaneLaysEgg.png",
        'imgDesc': "Man laying a massive egg. The Man came first.",
        'ethPrice': "0.257",
        'bnbPrice': "1.168",
    },
  {
        'id': 'NJ4532',
          'artistName': "Tom JONES",
        'pieceName': "When You’re Long On Mooney",
        'imgId': "nftImages/CoolLongMooney.png",
        'imgDesc': "Confident moonchad smoking a ciggie knowing Mooney will make him rich.",
        'ethPrice': "0.306",
        'bnbPrice': "1.390",
    },
  {
        'id': 'TY3493',
          'artistName': "Granola",
        'pieceName': "Space Bums",
        'imgId': "nftImages/BumInSpace.png",
        'imgDesc': "Women submitting their behinds to the powerful moon in the sky.",
        'ethPrice': "0.349",
        'bnbPrice': "1.582",
    },
  {
        'id': 'GH9023',
          'artistName': "Pepe Saiyan",
        'pieceName': "Drake Prefers Mooney",
        'imgId': "nftImages/DrakeLikesMooney.png",
        'imgDesc': "Drake expressing his exquisite taste for Mooney.",
        'ethPrice': "0.303",
        'bnbPrice': "1.374",
    },
  {
        'id': 'KJ1390',
          'artistName': "Pepe Saiyan",
        'pieceName': "The Average Mooney Holder",
        'imgId': "nftImages/200IQ.png",
        'imgDesc': "A visual description comparing Mooney Holders to other moon tokens.",
        'ethPrice': "0.264",
        'bnbPrice': "1.198",
    },
  {
        'id': 'KS2834',
          'artistName': "Terpie",
        'pieceName': "WAGMI Mooning The Internet",
        'imgId': "nftImages/BigAssMoon.png",
        'imgDesc': "WAGMI breaks the internet by mooning the cameraman.",
        'ethPrice': "0.394",
        'bnbPrice': "1.788",
    },
  {
        'id': 'JS3892',
          'artistName': "Terpie",
        'pieceName': "Jiggle",
        'imgId': "nftImages/jigJIG.png",
        'imgDesc': "The main object of attraction is the bum if it is round like a moon it makes .",
        'ethPrice': "0.529",
        'bnbPrice': "2.400",
    },
  {
        'id': 'NE2093',
          'artistName': "Tom JONES",
        'pieceName': "Moon Cheeks",
        'imgId': "nftImages/MoonCheeks.png",
        'imgDesc': "Cheeks made out of moon? Cheese?.",
        'ethPrice': "0.181",
        'bnbPrice': "0.822",
    },
  {
        'id': 'QE3490',
          'artistName': "Terpie",
        'pieceName': "Freq Fox",
        'imgId': "nftImages/Freq_Fox.jpg",
        'imgDesc': "Inspired by the music of ST4RFOX.",
        'ethPrice': "5.286",
        'bnbPrice': "24.012",
    },
  {
        'id': '54JASN',
          'artistName': "Terpie",
        'pieceName': "Warp of the Roses",
        'imgId': "nftImages/Warp_of_the_Roses.jpg",
        'imgDesc': "created from original Acyrilic painting.",
        'ethPrice': "3.084",
        'bnbPrice': "14.000",
    },
      {
        'id': '93ASNL',
          'artistName': "Terpie",
        'pieceName': "Street Signs",
        'imgId': "nftImages/Street_Signs.jpg",
        'imgDesc': "Which Road will you choose on this long Tripp.......",
        'ethPrice': "3.965",
        'bnbPrice': "18.025",
    },
      {
        'id': '88INOA',
          'artistName': "Terpie",
        'pieceName': "Tetra-Colored Summer",
        'imgId': "nftImages/Tetra-ColoredSummer.jpg",
        'imgDesc': "Digital work inspired by original painting using acyrilic pour technique.",
        'ethPrice': "6.889",
        'bnbPrice': "31.280",
    },
      {
        'id': 'BS6969',
          'artistName': "Terpie",
        'pieceName': "Prismatic Side of The Moon",
        'imgId': "nftImages/PrismaticSideofTheMoon.jpg",
        'imgDesc': "Shifting light to sides of each story, continually showing the way throughout time and space.",
        'ethPrice': "3.798",
        'bnbPrice': "17.242",
    },
      {
        'id': 'TP4201',
          'artistName': "Terpie",
        'pieceName': "Digtal Gander",
        'imgId': "nftImages/DigtalGander.jpg",
        'imgDesc': "Take a long Gander at this beautiful digital world. Made from originally acrylic painting.",
        'ethPrice': "2.204",
        'bnbPrice': "10.004",
    },
      {
        'id': 'PS2020',
          'artistName': "Pepe Saiyan",
        'pieceName': "Majik Mooney",
        'imgId': "nftImages/MajikMooney.png",
        'imgDesc': "Majik kicks ass and thats what Mooney is all about.",
        'ethPrice': "0.925",
        'bnbPrice': "4.200",
    },
      {
        'id': 'BS2021',
          'artistName': "Tom JONES",
        'pieceName': "$MOONEY",
        'imgId': "nftImages/Mmmooney.png",
        'imgDesc': "Why would you own anything else?",
        'ethPrice': "7.628",
        'bnbPrice': "34.630",
    },
      {
        'id': 'QS2023',
          'artistName': "Pepe Saiyan",
        'pieceName': "Jeselon",
        'imgId': "nftImages/Jeselon.png",
        'imgDesc': "He is unlikely to be our saviour, but there is little point not offering him a prayer in return for a tweet.",
        'ethPrice': "1.119",
        'bnbPrice': "5.082",
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
window.ethereum.on('networkChanged', (_chainId) => window.location.reload());

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
	const [networkId, setNetworkId] = useState(null);
	const [isMenuOpen, setMenuOpen] = useState(false);
	
	const [feedXAU, setFeedXAU] = useState(null);
	const [currentXAU, setCurrentXAU] = useState(0.00);

	const location = useLocation();
	const history = useHistory();
    //console.log(location.pathname);

	// initialize methods here	
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
	const networkIsEth = networkId === 1;
	const networkIsBsc = networkId === 56;



	return (
		
		<div className={"App" + appSize}>
			{location.pathname !== "/" && <div className="moon-back"/>}
			<header className="App-header">
			<nav className="sc-bqyKva ehfErK">
					<div onClick={()=>{setMenuOpen(!isMenuOpen)}} className="menu-trig">The Moon'ue</div>
					<ul className="sc-fodVxV cYLuAZ" style={{display: isMenuOpen? 'block' : 'none' }}>
					<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/">Home</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/nfts">NFT Presale</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/roadmap">Roadmap</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="./Mooney_Lightpaper_v1.1.pdf">Moon Paper</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/are-you-sure-its-a-joke">This is a joke...right?</a></li>
						<li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/collaborators">collaborators</a></li>
					</ul>
				</nav>
				<div className="ant-page-header-heading-title" onClick={()=>{history.push("/");}}>
					MOONEY 
				</div>
				
				<form onSubmit={handleConnectSubmit}>
					<span className="connect-button-holder">
						{appSize && abbrevWalAdress(walAddress)}
						{!appSize && <Button type="submit" className="connect-button">Connect MetaMask</Button>}
					</span>
				</form>
				{location.pathname === "/nfts" && <Cards NFTData={NFTData} handleConnectSubmit={handleConnectSubmit} networkId={networkId}/>}
				{location.pathname === "/" && <Home currentXAU={currentXAU} feedXAU={feedXAU}/>}
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
				<img src="./roadmap.png" className="icon-image-main-roadmap" />}
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
						<br/>
				<br/>
		</span>
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

