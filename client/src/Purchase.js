import React, { useState, useEffect, useRef } from 'react';
import { ethers } from "ethers";
import PInput from './PInput';
import { Container, Row, Col } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Xarrow from "react-xarrows";
import { debounce } from 'debounce-react';
import Modal from './Modal';
import { parseUnits } from '@ethersproject/units';
import ReactPlayer from 'react-player/youtube';



const styles = {
    root: {
        background: "white"
    },
    textField: {

    },
};

const baseAmount = 1000000000000000;

const Purchase = (props) => {

    const { classes, isMarginTop, purchaseEthersContract, contractAddress, myAddress, networkId, credsEx, abbrevWalAdress } = props;



    const preconfigPolicyList = [
        [
            [6666666, 1, 3, 30, 10, false, 0, 1, 20],
            [133333333, 1, 3, 30, 10, false, 0, 1, 9],
            [2666666665, 1, 3, 30, 10, false, 0, 1, 20],
            [33333333336, 1, 3, 30, 10, false, 0, 1, 9],
            [339999999999, 1, 3, 30, 10, false, 0, 1, 20],
            [777777777777777, 1, 3, 30, 10, false, 0, 1, 9],
        ],
        [
            [6666, 1, 3, 0, 0, false, 0, 1, 20],
            [133333, 2, 4, 10, 20, false, 0, 1, 9],
            [26666666, 3, 5, 20, 30, false, 0, 1, 20],
            [333333333, 4, 6, 30, 40, false, 0, 1, 9],
            [3399999999, 5, 7, 40, 50, false, 0, 1, 20],
            [7777777777777, 6, 8, 50, 60, false, 0, 1, 9],
        ],
        [
            [6666, 30, 3, 440, 440, false, 0, 1, 20],
            [133333, 12, 4, 310, 320, false, 0, 1, 9],
            [26666666, 11, 5, 220, 230, false, 0, 1, 20],
            [333333333, 10, 4, 130, 140, false, 0, 1, 9],
            [3399999999, 5, 3, 40, 50, false, 0, 1, 20],
            [7777777777777, 1, 1, 1, 1, false, 0, 1, 9],
        ],
        [
            [6666, 0, 0, 0, 0, false, 0, 0, 0],
            [133333, 0, 0, 0, 0, false, 0, 0, 0],
            [26666666, 0, 0, 0, 0, false, 0, 0, 0],
            [333333333, 0, 0, 0, 0, false, 0, 0, 0],
            [3399999999, 0, 0, 0, 0, false, 0, 0, 0],
            [7777777777777, 0, 0, 0, 0, false, 0, 0, 0],
        ]
    ];
    const [data, setData] = useState(preconfigPolicyList[0]);
    const [transactionAmount, setTransactionAmount] = useState(1.0000005);
    const [dropdownValue, setDropdownValue] = useState(networkId);
    const [thresholdIndex, setThresholdIndex] = useState(2);
    const [isShowLinkIllustration, setIsShowLinkIllustration] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuConfirmOpen, setMenuConfirmOpen] = useState(false);
    const [calculatedTransferResults, setCalculatedTransferResults] = useState([0, 0, 0, 0]);
    const [pendingFrom, setPendingFrom] = useState('0x00');
    const [pendingTo, setPendingTo] = useState('0x00');
    const [pendingAmount, setPendingAmount] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [errMsg, setErrMsg] = useState("Transaction failed!");
    const [userETHBalance, setUserETHBalance] = useState('0');
    const [transactionHash, setTransactionhash] = useState('...pending');
    const [transactionData, setTransactionData] = useState('no data available');
    const [successMessage, setSuccessMessage] = useState('...waiting for confirmations');
    const [isError, setIsError] = useState(false);
    const [isInstrctionMenuOpen, setInstrctionMenuOpen] = useState(false);
    const [isWarnOpen, setWarnOpen] = useState(false);
    const [transactionHashFetched, setTransactionHashFetched] = useState('Paste Transaction Hash here');

    const initialRender = useRef(true);
    const initialRender2 = useRef(true);

    let timerid;
    const timedLinkIllustration = () => {
        if (timerid) {
            clearTimeout(timerid);
        }
        debounce(() => {
            setIsShowLinkIllustration(true);
            timerid = setTimeout(() => {
                setIsShowLinkIllustration(false);
            }, 3500);
        });
    }

    async function calcEthers(transAmount) {
        // Converts integer as Eth to Wei,
        let amount = await ethers.utils.parseEther(transAmount.toString());
        return amount;
    }

    async function initListener() {
        try {
            // Listens for event on blockchain
            //event Calculated(uint256 numWeiInDollar, uint256 pricePerToken, uint256 pricePerWei,  uint256 Awardedtokens);
            await purchaseEthersContract.on("CalcAndSent", (one, two, three, four, five, six, seven) => {
                console.log('calcsent');
                console.log(one.toString());
                console.log(two.toString());
                console.log(three.toString());
                console.log(four.toString());
                console.log(five.toString());
                console.log(six.toString());
                console.log(seven.toString());
                const sevenString = seven.toString();
                setPendingAmount(sevenString.substring(0, sevenString.length - 18).toLocaleString());
                setSuccessMessage('Great Success!');


            })
        } catch (err) {
            if (typeof err.data !== 'undefined') {
                setErrMsg("Error: " + err.data.message);
            }
            setIsError(true);
        }
    }

    const perfromTransactionSecond = (transAmount) => {
        initListener().then(() => {
            console.log('listener inititated');
        });
        if (purchaseEthersContract) {
            let overrides = {
                // To convert Ether to Wei:
                value: transAmount.toString(),
                //gasPrice: 1   // ether in this case MUST be a string
            };
            try {
                console.log('trying thing$$$$');
                console.log(purchaseEthersContract.prePurchaseOnEthNetwork);

                //arguments to this method are arbitrary, since values are derived from msg.value and msg.sender in the contract.
                purchaseEthersContract.prePurchaseOnEthNetwork('0xC8D654Dce6691996DDEF0461706463e69c804034', 54444444, overrides).then((d, e) => {
                    setTransactionhash(d.hash);
                    setTransactionHashFetched(d.hash);
                    setTransactionData(JSON.stringify(d));
                    setMenuOpen(false);
                    setMenuConfirmOpen(true);
                    console.log('it worked');
                    console.log(d);
                    console.log(e);
                });
            } catch (err) {
                if (typeof err.data !== 'undefined') {
                    alert(err.data.message);
                } else {
                    alert('something went wrong');
                }
            }

        }
    }

    const goToTrans = () => {

    }

    // Interacts with smart contract to buy PCT
    const performTransaction = (transAmount) => {
        setMenuOpen(true);
        calcEthers(transAmount).then(
            (amt) => {
                perfromTransactionSecond(amt);
            }
        );
    }

    useEffect(() => {
        console.log('dddxxxxx');
        //getUserEthBalance();
    }, [userETHBalance]);

    useEffect(() => {
        if (initialRender2.current) {
            initialRender2.current = false;
        } else {
            setInstrctionMenuOpen(true);
        }
    }, [dropdownValue]);

    //useEffect(() => {
    //    if (initialRender2.current) {
    //        initialRender2.current = false;
    //    } else {
    //        getUserEthBalance();
    //        debounce(timedLinkIllustration, 1000, false);
    //    }
    //}, [dropdownValue]);

    const calculateTax = (transferAmount, lessAmount, isFixed) => {
        if (isFixed) {
            return lessAmount;
        } else {
            // round up weird ass numbers
            return Math.ceil(transferAmount * (lessAmount / (100)));
        }
    }

    useEffect(() => {
        console.log('ddd');

    }, [isMenuOpen]);


    const handleChangePolicy = (event) => {
        setDropdownValue(event.target.value);
    };

    function getNumberOfWeiInDollar() {
        const weiBase = 1000000000000000000;
        //update this to come from api.
        let ethBase = 2431;

        if (networkId == 97 || networkId == 56) {
            ethBase = 363;
        }
        return weiBase / ethBase;
    }

    const handleTChange = (event) => {
        if (event.target.name === "AMT") {
            setTransactionHashFetched(event.target.value);
            return false;
        }
        if (isNaN(event.target.value)) {
            return false;
        }
        if ("" == event.target.value) {
            return false;
        }
        checkNeedsToUpdateActiveIndex(event.target.value);
        setTransactionAmount(event.target.value);
    };

    const checkNeedsToUpdateActiveIndex = () => {
        data.every((arr, index) => {
            console.log(transactionAmount + "<" + arr[0]);
            if (transactionAmount < arr[0]) {
                setThresholdIndex(index);
                //console.log('wtf' + arr[0]);
                //console.log(index);  
                return false;
            }
            return true;
        }
        );
        //setThresholdIndex(5);
    };

    const copyToClipboard = (str) => {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);

        /* Alert the copied text */
        alert("Copied the text: " + str);

    }

    function calculateTokensBack(transAmount) {
        const numWeiInDollar = getNumberOfWeiInDollar();
        console.log('number of wei in dollar should be 380807311500380');
        console.log(numWeiInDollar);
        //update this.
        const oneQuadrillion = 1000000000000000;
        const targetMarketCap = 35000000;
        const pricePerToken = oneQuadrillion / targetMarketCap;
        console.log('price per token should be 28571428571428571428571428');
        console.log(pricePerToken);
        let amount = ethers.utils.parseEther(transAmount.toString());
        console.log('price in ethers should be 4000000000000000');
        console.log(amount);
        const pricePerWei = amount / numWeiInDollar;
        console.log('price per wei should be 10');
        console.log(Math.floor(pricePerWei));
        const awardedTokens = (Math.floor(pricePerWei) * pricePerToken);
        return Math.round(awardedTokens).toLocaleString();

        //4000000000000000 ethin
        //Purchase.js:127 35000000 prePurchaseTargetMarketCap
        //Purchase.js:128 380807311500380 numWeiInDollar numWeiInDollar
        //Purchase.js:129 1000000000000000000000000000000000 totalSupply
        //Purchase.js:130 28571428571428571428571428 pricePerToken
        //Purchase.js:131 10 pricePerWei
        //Purchase.js:132 285714285714285714285714280 awardedTokens

    }
    const networkIsBsc = networkId === 56;
    //sets up testnet
    const networkIsKoven = networkId === 42;
    const networkIsBSCTest = networkId === 97;
    const networkRefArr = 0;
    let awardDenomination = "none";
    if (networkId == 1) {
        awardDenomination = "ETH";
    }
    if (networkId == 56) {
        awardDenomination = "BNB";
    }
    if (networkId == 42) {
        awardDenomination = "TEST ETH";
    }
    if (networkId == 97) {
        awardDenomination = "TEST BNB";
    }

    const widthMetricSmall = window.screen.width < 950;
    const vHeight = widthMetricSmall ? 250 : 400;
    const vWidth = widthMetricSmall ? 350 : 610;

    return (
        <Container>
            <Row className="justify-content-md-center" style={{ marginTop: '100px' }}>
                <Col md="auto">
                    <ReactPlayer allowFullScreen="true" url='https://www.youtube.com/watch?v=AKVsck_1Vgkk' height={vHeight + "px"} width={vWidth + "px"} style={{ margin: '0 auto', marginTop: '0px', paddingBottom: '0px', border: '15px solid #1c1f24', borderRadius: '5px', backgroundColor: 'black' }} />
                    <br/><br/><br/>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{ marginTop: isMarginTop }}>
                <Col md="auto">
                    <div className="" style={{ backgroundColor: 'none', border: '0px solid', width: '342px' }}>
                        <div className="sc-fWPcDo cgpajZ tokens-minted" style={{ background: 'none', border: '0px solid' }}>

                            <div className="mint-cardGroup" style={{ marginBottom: '15px', marginTop: '50px' }}>
                                <table style={{ position: 'absolute', top: "-40px" }}>
                                    <thead></thead>
                                    <tr><td style={{ width: '31px' }}>
                                        &nbsp;
                                            </td>
                                        <td style={{ width: '231px' }}>
                                            <span style={{ fontSize: '15px', lineHeight: '10px' }}>You are about to send:</span>
                                            <hr />
                                            <span style={{ lineHeight: '10px', color: 'pink' }}>{transactionAmount}</span> {awardDenomination}
                                            <br />
                                            <span style={{ fontSize: '15px', lineHeight: '25px' }}>to contract</span>
                                            <br />
                                            <span onClick={() => { copyToClipboard(contractAddress) }} style={{ cursor: 'pointer' }}>{abbrevWalAdress(contractAddress)}</span> &nbsp;<a href={credsEx[networkId][5] + "/address/" + contractAddress} target="_blank"><img src="./tiny_pink.png" width="20" /></a>
                                            <br />
                                            <span style={{ fontSize: '15px', lineHeight: '25px' }}>from</span>
                                            <br />
                                            <span onClick={() => { copyToClipboard(myAddress) }} style={{ cursor: 'pointer' }}>{abbrevWalAdress(myAddress)}</span> &nbsp;<a href={credsEx[networkId][5] + "/address/" + myAddress} target="_blank"><img src="./tiny_pink.png" width="20" /></a><br />
                                            <span style={{ fontSize: '15px', lineHeight: '10px' }}>You will recieve:</span>
                                            <br />
                                            <span style={{ lineHeight: '10px', color: 'rgb(73 255 24)' }}>~{calculateTokensBack(transactionAmount)} </span>
                                            <br />
                                            <span style={{ fontSize: '15px', lineHeight: '10px' }}>MOONEY</span>
                                            <div className="black-thick" style={{ padding: '15px' }}>

                                                <span class="small-text">assumes ETH price of ~$2,750 and</span><br /> <span style={{ color: 'rgb(73 255 24)' }}>M.C. of $35 Million</span>

                                            </div>


                                        </td>
                                    </tr>

                                </table>








                            </div>
                        </div>
                    </div>


                </Col>
                <Col md="auto">

                    <div className="sc-hjWSAi jEjURK" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="sc-gGTGfU fSjCQg colorBump2" style={{ padding: '10px' }}>
                            <div style={{ marginBottom: '5px', marginTop: '15px' }} >Purchase Amount:</div>
                            <div className={classes.textField}>
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker"

                                    value={transactionAmount}
                                    name="ETA"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br /><br />

                                <div styleClass={{ padding: '15px', margin: '0 auto' }}>
                                    {networkId && <img src={"./cn" + networkId + ".png"} width="162px" style={{ marginTop: "-43px" }} />}
                                </div>
                                <div className="jEjURK" style={{ maxWidth: '280px', margin: '0 auto', padding: '15px', fontSize: '15px' }}>{credsEx[dropdownValue][4]}</div>

                                <br />
                                <table styleClass={{ padding: '15px', margin: '0 auto' }}>
                                    <th></th>
                                    <tr><td><div style={{ width: '15px', minWidth: '15px', }} />
                                    </td>
                                        <td>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Purchase Options</InputLabel>
                                                <Select
                                                    native
                                                    value={dropdownValue}
                                                    onChange={handleChangePolicy}
                                                    label="Purchase Options"
                                                    inputProps={{
                                                        name: 'Preconfig',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                    className="policy-dropper"
                                                >
                                                    <option value={1}>ETH Purchase</option>
                                                    <option value={56}>BSC Purchase</option>
                                                    <option value={42}>(Kovan Testnet)</option>
                                                    <option value={97}>(BSC Testnet)</option>
                                                </Select>

                                            </FormControl></td><td><div style={{ width: '35px', minWidth: '35px', }} />
                                        </td><td>
                                            <Button className="front-buy-button-2" onClick={() => { setWarnOpen(true); }} >Purchase</Button>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <br />
                        </div>
                    </div>
                    <br /><br /><br />

                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="sc-hjWSAi jEjURK" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="sc-gGTGfU fSjCQg colorBump2" style={{ padding: '10px' }}>
                            <div style={{ marginBottom: '5px', marginTop: '15px' }} >View Awarded Amount:</div>
                            <div className={classes.textField}>
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={transactionHashFetched}
                                    name="AMT"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /><br /><br />
                                <Button href={credsEx[networkId][5] + "/tx/" + transactionHashFetched} target="_blank" className="front-buy-button-3" >View TX on the {credsEx[networkId][6]}</Button>
                                <br /><br /></div></div></div>
                </Col>
            </Row>
            {isShowLinkIllustration && <Xarrow
                end={"inputs-" + thresholdIndex} //can be react ref
                start={"threshold-" + thresholdIndex} //or an id
                animateDrawing={1}
                curveness={1.5}
                dashness={true}
                endAnchor={{ position: "left", offset: { bottomness: 0, rightness: 6 } }}
                startAnchor={{ position: "right", offset: { rightness: -19 } }}
                showXarrow={true}
                color="#f007df"
                headShape="circle"
                tailShape="arrow"
                showTail="true"
                headSize="10"
                tailSize="10"
            />}
            {isMenuOpen && <div><Modal onClose={() => { setMenuOpen(false) }} cantClose>
                <br />
                <h2>Complete your Transaction with Metamask...</h2>


                <div className="rotateHolder" width="150px">

                    <img src="./fox-spin.png" width="150px" className="rotate" />
                </div>
                <br />

                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td>
                                <img src="./toot_under.png" width="70px" />
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">When you are done, put your transaction id into Telegram</span><br /> <span style={{ color: 'rgb(73 255 24)' }}>t.me/MooneyHQ</span>
                            </td></tr></table>
                </div>




            </Modal>
            </div>
            }
            {isMenuConfirmOpen && <div><Modal onClose={() => { setMenuConfirmOpen(false) }} conffetti={pendingAmount ? true : false}>
                <br />
                <h2>{successMessage}</h2>
                <br />

                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">Transaction id:</span><br /> <span style={{ fontSize: '15px' }}>{transactionHash}</span>
                            </td></tr></table>
                </div>
                <br />
                <br />
                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">Amount of Mooney Awarded:</span><br /> <span style={{ color: 'rgb(73 255 24)' }}>{pendingAmount || <img src="./fox-spin.png" width="60px" className="rotate" />}</span>
                            </td></tr></table>
                </div>
                <div>
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td>
                                <img src="./toot_under.png" width="70px" />
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">When you are done, put your transaction id into Telegram</span><br /> <span style={{ color: 'rgb(73 255 24)' }}>t.me/MooneyHQ</span>
                            </td></tr></table>
                </div>
                <Button onClick={() => { copyToClipboard(transactionData); }} >Copy Transaction Data to Clipbaord</Button>
            </Modal>
            </div>
            }
            {isWarnOpen && <div><Modal onClose={() => { setWarnOpen(false) }}>
                <br />
                <h2>Agree to terms</h2>
                <br />

                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">Terms:</span><br /> <span style={{ fontSize: '15px' }}>Mooney is a community based research project, that does not represent an investment or expectation of a profit. It is possible that Mooney will not Moon at all, and that it will remain a development tool for blockchain innovation and research in our collective.</span>
                            </td></tr></table>
                </div>
                <br />
                <br />
                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">Your network is {(networkId == 1 || networkId == 42) && <span>Ethereum</span>}{(networkId == 56 || networkId == 97) && <span>BSC Smart Chain</span>}</span><br />
                                If you purchase on Ethereum, you will need to give us your transaction ID in telegram (Our website will provide you with this when you complete the transaction in MetaMask). If you are purchasing with BNB on binance smart chain, your tokens will be awarded automatically.
                            </td></tr></table>
                </div>
                <br />
                <br />
                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text" style={{ color: 'red' }}>Important!</span><br />
                                Our smart contract uses the chainlink API to determine the amount of Mooney awarded. There may be discrepencies between the calculation you interacted with in our UI, and the final awarded amount. This is expected, and by clicking continue you understand the nature of this variance.
                            </td></tr></table>
                </div>
                <br />
                <br />
                <Button onClick={() => { setWarnOpen(false); performTransaction(transactionAmount); }} >I Agree and wish to Continue</Button>
            </Modal>
            </div>
            }
            {isInstrctionMenuOpen && <div><Modal onClose={() => { setInstrctionMenuOpen(false) }}>
                <br />
                <h2>Purchase Options:</h2>
                <br />
                <hr />
                Currently you can purchase Mooney through our website with ETH or *BNB <br />(i.e. BNB on Binance Smart Chain)
                <hr />
                <span style={{ color: 'rgb(73 255 24)' }}>Note: The Network metamask is connected to when you purchase is what will dictate your purchase option.</span>
                <hr />
                <img src="./network-screen.png" width="300" />
                <hr />
                <span style={{ color: 'rgb(73 255 24)' }}>Please make sure metamask is either connected to the Ethereum network or the Binance Smart Chain network to purchase</span>
                <hr />
                <hr />
                <span>If you purchase with BNB, the balance will be sent directly back to your address. If you purchase with ETH, you will need to paste your transaction id (provided to you through the transaction on the website) into our telegram channel, and we will send you the balance manually.</span>
                <hr />
                <Button href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_blank">Learn how to add Network to metamask</Button>
                <hr />

                <div className="black-thick">
                    add {credsEx[dropdownValue][6]} to Metamask
                <table style={{ margin: '0 auto' }} className="smallPurchaseTable">
                        <thead></thead>
                        <tr>
                            <td className="smallPurchaseTable" style={{ padding: '10px' }}>
                                Network Name:
                                        </td>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                <span class="small-text">{credsEx[dropdownValue][0]}</span>
                            </td></tr>
                        <tr>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                New RPC <br />URL:
                                        </td>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                <span class="small-text">{credsEx[dropdownValue][1]}</span>
                            </td></tr>
                        <tr>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                Chain ID:
                                        </td>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                <span class="small-text">{credsEx[dropdownValue][2]}</span>
                            </td></tr>
                        <tr>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                Currency <br />Symbol:
                                        </td>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                <span class="small-text">{credsEx[dropdownValue][3]}</span>
                            </td></tr>
                        <tr>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                Block <br />Explorer
                                        </td>
                            <td style={{ padding: '10px' }} className="smallPurchaseTable">
                                <span class="small-text">{credsEx[dropdownValue][5]}</span>
                            </td></tr>

                    </table>
                    <br />

                </div>
                <br />
                <br />
                <div className="black-thick">
                    <span class="small-text">Mooney was launched on Binance Smart Chain in it's first iteration to test out our burgeoning transaction based tokenomics policy in an environment that faciliated reasonable fee structures.
                <br /> That being said, you can still purchase Mooney at a specified exchange rate managed by our contracts chainlink integration with a dynamic ethereum price feed.
                As of June 5th, 2021 there are currently two ways to purchase Mooney from our website. </span>
                </div>
                <div>
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td>
                                <img src="./toot_under.png" width="70px" />
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">Questions? Reach out to our Telegram</span><br /> <a href="t.me/MooneyHQ" target="_blank" style={{ color: 'rgb(73 255 24)' }}>t.me/MooneyHQ</a>
                            </td></tr></table>
                </div>

            </Modal>
            </div>
            }
        </Container>

    );




}
Purchase.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Purchase);

