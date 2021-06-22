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

const Admin = (props) => {

    const { classes, isMarginTop, purchaseEthersContract, contractAddress, myAddress, networkId, credsEx, abbrevWalAdress } = props;


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
    const [taxVals, setTaxVals] = useState([0,0,0,0,0,0,0]);

    const [recieverAddress, setRecieverAddress] = useState('');
    const [numTokens, setNumtokens] = useState('');

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

    const updateTaxableThresholdsAtIndex = (indexToMod, thresHoldFixed, taxPerc, burnPerc, taxFixed, burnFixed, isFixed) => {
        //initListener().then(() => {
        //    console.log('listener inititated');
        //});
        if (purchaseEthersContract) {
            //let overrides = {
            // To convert Ether to Wei:
            //  value: transAmount.toString(),
            //gasPrice: 1   // ether in this case MUST be a string
            //};
            try {
               
                console.log('wtf');
                console.log(taxVals[0]);
                //arguments to this method are arbitrary, since values are derived from msg.value and msg.sender in the contract.
                purchaseEthersContract.updateTaxableThresholdsAtIndex(taxVals[0].toString(), taxVals[1].toString(), taxVals[2].toString(), taxVals[3].toString(), taxVals[4].toString(), taxVals[5].toString(), taxVals[6].toString()).then((d, e) => {
                    //alert('called');
                    //alert(d.toNumber());
                    //window.test = d;
                    console.log(d);
                    console.log(d.toString());

                });
            } catch (err) {
                if (typeof err.data !== 'undefined') {
                    alert(err.data.message);
                } else {
                    console.log(err);
                    alert('something went wrong');
                }
            }

        }
    }

    const transferTaxFree = () => {
        //initListener().then(() => {
        //    console.log('listener inititated');
        //});
        if (purchaseEthersContract) {
            //let overrides = {
            // To convert Ether to Wei:
            //  value: transAmount.toString(),
            //gasPrice: 1   // ether in this case MUST be a string
            //};
            try {
               

                //arguments to this method are arbitrary, since values are derived from msg.value and msg.sender in the contract.
                purchaseEthersContract.transferTaxFree(recieverAddress, numTokens).then((d, e) => {
                    //alert('called');
                    //alert(d.toNumber());
                    //window.test = d;
                    console.log(d);
                    console.log(d.toString());

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

    const getContractOwner = (transAmount) => {
        //initListener().then(() => {
        //    console.log('listener inititated');
        //});
        if (purchaseEthersContract) {
            //let overrides = {
            // To convert Ether to Wei:
            //  value: transAmount.toString(),
            //gasPrice: 1   // ether in this case MUST be a string
            //};
            try {
                console.log('trying thing$$$$');
                console.log(purchaseEthersContract.prePurchaseOnEthNetwork);

                //arguments to this method are arbitrary, since values are derived from msg.value and msg.sender in the contract.
                purchaseEthersContract.getContractOwner().then((d, e) => {
                    //alert('called');
                    //alert(d.toNumber());
                    //window.test = d;
                    alert(d.toString());

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
   
    

    const getTotalSupply = (transAmount) => {
        //initListener().then(() => {
        //    console.log('listener inititated');
        //});
        if (purchaseEthersContract) {
            //let overrides = {
            // To convert Ether to Wei:
            //  value: transAmount.toString(),
            //gasPrice: 1   // ether in this case MUST be a string
            //};
            try {
                console.log('trying thing$$$$');
                console.log(purchaseEthersContract.prePurchaseOnEthNetwork);

                //arguments to this method are arbitrary, since values are derived from msg.value and msg.sender in the contract.
                purchaseEthersContract.totalSupply().then((d, e) => {
                    //alert('called');
                    //alert(d.toNumber());
                    //window.test = d;
                    alert(d.toString());

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
            setRecieverAddress(event.target.value);
            //setTransactionHashFetched(event.target.value);
            return false;
        }
        if (event.target.name === "AMD") {
            setNumtokens(event.target.value);
            return false;
        }
        const newTaxVals = [...taxVals];
        if (event.target.name === "INDEX0"){
            newTaxVals[0] = event.target.value;
        }
        if (event.target.name === "THRESHOLD1"){
            newTaxVals[1] = event.target.value;
        }
        if (event.target.name === "TAXPERC2"){
            newTaxVals[2] = event.target.value;
        }
        if (event.target.name === "BURNPERC3"){
            newTaxVals[3] = event.target.value;
        }
        if (event.target.name === "TAXFIXED4"){
            newTaxVals[4] = event.target.value;
        }
        if (event.target.name === "BURNFIXED5"){
            newTaxVals[5] = event.target.value;
        }
        if (event.target.name === "ISFIXED6"){
            newTaxVals[6] = event.target.value;
        }
        setTaxVals(newTaxVals);
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

            <Row>
                <Col>
                    <div className="sc-hjWSAi jEjURK" style={{ background: 'rgba(111, 22, 44, 0.5)' }}>
                        <div className="sc-gGTGfU fSjCQg colorBump2" style={{ padding: '10px' }}>
                        <br />
                                <br />
                            <Button onClick={() => { getTotalSupply(); }} target="_blank" className="front-buy-button-3" >Get Mooney Total Supply</Button>
                            <br />
                            <br />
                            <Button onClick={() => { getContractOwner(); }} target="_blank" className="front-buy-button-3" >Get Contract Owner</Button>
                            <br />
                            
                          
                                <br />
                            <hr />
                            <div style={{ marginBottom: '5px', marginTop: '15px' }} >Reciever Address:</div>
                            <div className={classes.textField}>
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={recieverAddress}
                                    name="AMT"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /><br /><br />
                               
                            </div>
                            <div style={{ marginBottom: '5px', marginTop: '15px' }} >Number of Tokens:</div>
                            <div className={classes.textField}>
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={numTokens}
                                    name="AMD"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /><br /><br />
                                <Button onClick={()=>{transferTaxFree()}} target="_blank" className="front-buy-button-3" >Transfer Tax Free</Button>
                                <br />
                                <br />
                            </div>
                        </div>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <br/>
                        <div style={{ marginBottom: '5px', marginTop: '15px' }} >update Tax thresholds</div>
                            <div className={classes.textField}>
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '50px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[0]}
                                    name="INDEX0"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '250px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[1]}
                                    name="THRESHOLD1"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                 <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '50px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[2]}
                                    name="TAXPERC2"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                 <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '50px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[3]}
                                    name="BURNPERC3"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '50px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[4]}
                                    name="TAXFIXED4"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                 <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '50px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[5]}
                                    name="BURNFIXED5"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <input
                                    id="standard-full-width"
                                    label="Example Transaction Amount"
                                    style={{ textAlign: 'right', maxWidth: '50px' }}
                                    margin="dense"
                                    className="policy-maker large-policy-maker largest-policy-maker"
                                    value={taxVals[6]}
                                    name="ISFIXED6"
                                    onChange={handleTChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br /><br />
                                <Button onClick={()=>{updateTaxableThresholdsAtIndex()}} target="_blank" className="front-buy-button-3" >Update Taxable Thresholds</Button>
                                <br/>1)Tax Bracket #(0-5), 2) Token Threshold for Bracket 3) PercTax 4) Perc Burn 5) Fixed Tax 6) Fixed burn 7) is Fixed? (1 or 0)
                                <br />
                                <br />
                            </div>
                                

                    </div>
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
Admin.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Admin);

