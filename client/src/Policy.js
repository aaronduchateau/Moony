import React, { useState, useEffect, useRef } from 'react';
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

const styles = {
    root: {
        background: "white"
    },
    textField: {

    },
};

const baseAmount = 1000000000000000;

const Policy = (props) => {
    const { classes, isMarginTop } = props;
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
    const [transactionAmount, setTransactionAmount] = useState(266666666);
    const [dropdownValue, setDropdownValue] = useState(0);
    const [thresholdIndex, setThresholdIndex] = useState(2);
    const [isShowLinkIllustration, setIsShowLinkIllustration] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [calculatedTransferResults, setCalculatedTransferResults] = useState([0, 0, 0, 0]);

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

    useEffect(() => {
        if (initialRender2.current) {
            initialRender2.current = false;
        } else {
            debounce(timedLinkIllustration, 1000, false);
        }
    }, [thresholdIndex]);

    const calculateTax = (transferAmount, lessAmount, isFixed) => {
        if (isFixed) {
            return lessAmount;
        } else {
            // round up weird ass numbers
            return Math.ceil(transferAmount * (lessAmount / (100)));
        }
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            const currentPolicy = data[thresholdIndex];
            let burnAmount;
            let daoAmount;
            if (currentPolicy[5] == false) {
                burnAmount = calculateTax(transactionAmount, currentPolicy[1], false);
                burnAmount = (burnAmount > 0) ? burnAmount : 0;
                daoAmount = calculateTax(transactionAmount, currentPolicy[2], false);
                daoAmount = (daoAmount > 0) ? daoAmount : 0;
            } else {
                burnAmount = calculateTax(transactionAmount, currentPolicy[3], true);
                daoAmount = calculateTax(transactionAmount, currentPolicy[4], true);
            }
            const finalTransferAmount = (transactionAmount - burnAmount) - daoAmount;
            let mintAmount = calculateTax(daoAmount, currentPolicy[6], false);
            mintAmount = (mintAmount > 0) ? mintAmount : 0;
            let oceanFund = calculateTax(daoAmount, currentPolicy[7], false);
            oceanFund = (oceanFund > 0) ? oceanFund : 0;
            let redistribute = calculateTax(daoAmount, currentPolicy[8], false);
            
            redistribute = (redistribute > 0) ? redistribute : 0;
            console.log(daoAmount+ ' '+oceanFund + ' ' +redistribute);
            let daoDevFund = (daoAmount - oceanFund) - redistribute;
            setCalculatedTransferResults([finalTransferAmount, burnAmount, daoAmount, mintAmount, oceanFund, redistribute, daoDevFund]);
        }
    }, [isMenuOpen]);





    const isBoolean = val => 'boolean' === typeof val;
    const handleChange = (event) => {
        if(!isBoolean(event.target.checked)){
            if(isNaN(event.target.value)){
            
                if(!isBoolean(event.target.value)){
                    return false;
                }
            }
            if("" == event.target.value){
                return false;
            }

        }
        
        const arr = event.target.name.split("-");
        const topLevelIndex = arr[0];
        let secondaryIndex = arr[1];
        const oldData = [...data];
        const oldValues = [...data[topLevelIndex]];
        const numValue = ("" == event.target.value) ? 0 : event.target.value;
        oldValues[secondaryIndex] = (secondaryIndex == 5) ? event.target.checked : parseInt(numValue);
        oldData[topLevelIndex] = oldValues;
        setData(oldData);
        console.log(oldValues);
        console.log(oldData);
        console.log(arr[1]);
        console.log(event.target.checked);
        //topIndex = arr[0];
        //secondaryIndex = arr[1];
        //const newArr = data[0];
    };
    const handleTChange = (event) => {
        if(isNaN(event.target.value)){
            return false;
        }
        if("" == event.target.value){
            return false;
        }
        checkNeedsToUpdateActiveIndex(event.target.value);
        setTransactionAmount(event.target.value);
    };

    const handleChangePolicy = (event) => {
        console.log(event.target);
        setDropdownValue(event.target.value);
        setData(preconfigPolicyList[event.target.value]);
        checkNeedsToUpdateActiveIndex();
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

    console.log(thresholdIndex);

    return (
        <Container>
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
                                        <td style={{ width: '121px', lineHeight: '10px' }}>
                                            <span style={{ fontSize: '15px' }}>Amount to <br />Burn</span>
                                        </td>
                                        <td style={{ width: '15px' }}>
                                            &nbsp;
                                            </td>
                                        <td style={{ width: '121px', lineHeight: '10px' }}>
                                            <span style={{ fontSize: '15px' }}>Amount to <br />Community Fund</span>
                                        </td>
                                    </tr>

                                </table>




                                <div className={"policy-maker" + (thresholdIndex == 0 ? " active-maker" : "")} >

                                    <table>
                                        <thead></thead>

                                        <tr>
                                            <td>
                                                <div style={{ width: '31px', minWidth: '31px' }}>
                                                    1)
                                            </div>
                                            </td>
                                            <td>
                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={0}
                                                    secondaryIndex={data[0][5] ? 3 : 1}
                                                    data={data}
                                                    label="BURN"
                                                    level={0}
                                                /></td>
                                            <td style={{ width: '5px', minWidth: '5px' }}>

                                            </td>
                                            <td>

                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={0}
                                                    secondaryIndex={data[0][5] ? 4 : 2}
                                                    data={data}
                                                    label="DAO"
                                                    level={0}
                                                /></td><td id="inputs-0">
                                                <Switch
                                                    checked={data[0][5]}
                                                    onChange={handleChange}
                                                    name="0-5"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </td></tr></table>
                                </div>

                                <div className={"policy-maker" + (thresholdIndex == 1 ? " active-maker" : "")}>
                                    <table>
                                        <thead></thead>
                                        <tr>
                                            <td>
                                                <div style={{ width: '31px', minWidth: '31px' }}>
                                                    2)
                                            </div>
                                            </td>

                                            <td>
                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={1}
                                                    secondaryIndex={data[1][5] ? 3 : 1}
                                                    data={data}
                                                    label="BURN"
                                                    level={1}
                                                /></td>
                                            <td style={{ width: '5px', minWidth: '5px' }}>

                                            </td>
                                            <td>

                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={1}
                                                    secondaryIndex={data[1][5] ? 4 : 2}
                                                    data={data}
                                                    label="DAO"
                                                    level={1}
                                                /></td><td id="inputs-1">
                                                <Switch
                                                    checked={data[1][5]}
                                                    onChange={handleChange}
                                                    name="1-5"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </td></tr></table>
                                </div>

                                <div className={"policy-maker" + (thresholdIndex == 2 ? " active-maker" : "")}>
                                    <table>
                                        <thead></thead>

                                        <tr><td>
                                            <div style={{ width: '31px', minWidth: '31px' }}>
                                                3)
                                            </div>
                                        </td>
                                            <td>
                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={2}
                                                    secondaryIndex={data[2][5] ? 3 : 1}
                                                    data={data}
                                                    label="BURN"
                                                    level={2}
                                                /></td>
                                            <td style={{ width: '5px', minWidth: '5px' }}>

                                            </td>
                                            <td>

                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={2}
                                                    secondaryIndex={data[2][5] ? 4 : 2}
                                                    data={data}
                                                    label="DAO"
                                                    level={2}
                                                /></td><td id="inputs-2">
                                                <Switch
                                                    checked={data[2][5]}
                                                    onChange={handleChange}
                                                    name="2-5"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </td></tr></table>
                                </div>

                                <div className={"policy-maker" + (thresholdIndex == 3 ? " active-maker" : "")}>
                                    <table>
                                        <thead></thead>
                                        <tr>
                                            <td>

                                                <div style={{ width: '31px', minWidth: '31px' }}>
                                                    4)
                                            </div>
                                            </td>
                                            <td>
                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={3}
                                                    secondaryIndex={data[3][5] ? 3 : 1}
                                                    data={data}
                                                    label="BURN"
                                                    level={3}
                                                /></td>
                                            <td style={{ width: '5px', minWidth: '5px' }}>

                                            </td>
                                            <td>

                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={3}
                                                    secondaryIndex={data[3][5] ? 4 : 2}
                                                    data={data}
                                                    label="DAO"
                                                    level={3}
                                                /></td><td id="inputs-3">
                                                <Switch
                                                    checked={data[3][5]}
                                                    onChange={handleChange}
                                                    name="3-5"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </td></tr></table>
                                </div>

                                <div className={"policy-maker" + (thresholdIndex == 4 ? " active-maker" : "")}>
                                    <table>
                                        <thead></thead>
                                        <tr>
                                            <td>

                                                <div style={{ width: '31px', minWidth: '31px' }}>
                                                    5)
                                            </div>
                                            </td>
                                            <td>
                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={4}
                                                    secondaryIndex={data[4][5] ? 3 : 1}
                                                    data={data}
                                                    label="BURN"
                                                    level={4}
                                                /></td>
                                            <td style={{ width: '5px', minWidth: '5px' }}>

                                            </td>
                                            <td>

                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={4}
                                                    secondaryIndex={data[4][5] ? 4 : 2}
                                                    data={data}
                                                    label="DAO"
                                                    level={4}
                                                /></td><td id="inputs-4">
                                                <Switch
                                                    checked={data[4][5]}
                                                    onChange={handleChange}
                                                    name="4-5"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </td></tr></table>
                                </div>

                                <div className={"policy-maker" + (thresholdIndex == 5 ? " active-maker" : "")}>
                                    <table>
                                        <thead></thead>
                                        <tr>
                                            <td>
                                                <div style={{ width: '31px', minWidth: '31px' }}>
                                                    6)
                                            </div>
                                            </td>
                                            <td>
                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={5}
                                                    secondaryIndex={data[5][5] ? 3 : 1}
                                                    data={data}
                                                    label="BURN"
                                                    level={5}
                                                /></td>
                                            <td style={{ width: '5px', minWidth: '5px' }}>

                                            </td>
                                            <td>

                                                <PInput
                                                    handleChange={handleChange}
                                                    topIndex={5}
                                                    secondaryIndex={data[5][5] ? 4 : 2}
                                                    data={data}
                                                    label="DAO"
                                                    level={5}
                                                /></td><td id="inputs-5">
                                                <Switch
                                                    checked={data[5][5]}
                                                    onChange={handleChange}
                                                    name="5-5"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />{data[5][5]}
                                            </td></tr></table>
                                </div>


                            </div>
                        </div>
                    </div>


                </Col>
                <Col md="auto">

                    <div className="sc-hjWSAi jEjURK">
                        <div className="sc-gGTGfU fSjCQg colorBump2" style={{ padding: '10px' }}>
                            <div style={{ marginBottom: '5px', marginTop: '15px' }} >Transaction Amount:</div>
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
                                <div style={{ marginBottom: '5px' }} >
                                    Tax Brackets:</div>
                                <table styleClass={{ padding: '15px', margin: '0 auto' }}>
                                    <th></th>
                                    <tr><td>&nbsp;&nbsp;&nbsp;</td>
                                        <td><span id="threshold-0">1)</span><input
                                            style={{ textAlign: 'right' }}
                                            className="policy-maker-thresh large-policy-maker"
                                            value={data[0][0]}
                                            onChange={handleChange}
                                            name="0-0"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /></td><td>&nbsp;</td>
                                        <td><span id="threshold-3">4)</span><input
                                            style={{ textAlign: 'right' }}
                                            margin="dense"
                                            className="policy-maker-thresh large-policy-maker"
                                            value={data[3][0]}
                                            onChange={handleChange}
                                            name="3-0"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /></td>
                                    </tr>
                                    <tr><td>&nbsp;&nbsp;&nbsp;</td>
                                        <td><span id="threshold-1">2)</span><input
                                            style={{ textAlign: 'right' }}
                                            className="policy-maker-thresh large-policy-maker"
                                            value={data[1][0]}
                                            onChange={handleChange}
                                            name="1-0"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /></td><td>&nbsp;</td>
                                        <td><span id="threshold-4">5)</span><input
                                            style={{ textAlign: 'right' }}
                                            margin="dense"
                                            className="policy-maker-thresh large-policy-maker"
                                            value={data[4][0]}
                                            onChange={handleChange}
                                            name="4-1"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /></td>
                                    </tr>     <tr><td>&nbsp;&nbsp;&nbsp;</td>
                                        <td><span id="threshold-2">3)</span><input
                                            style={{ textAlign: 'right' }}
                                            className="policy-maker-thresh large-policy-maker"
                                            value={data[2][0]}
                                            onChange={handleChange}
                                            name="2-0"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /></td><td>&nbsp;</td>
                                        <td><span id="threshold-5">6)</span><input
                                            style={{ textAlign: 'right' }}
                                            margin="dense"
                                            className="policy-maker-thresh large-policy-maker"
                                            value={data[5][0]}
                                            onChange={handleChange}
                                            name="5-0"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        /></td>
                                    </tr>
                                </table>
                                <br />
                                <table styleClass={{ padding: '15px', margin: '0 auto' }}>
                                    <th></th>
                                    <tr><td><div style={{ width: '15px', minWidth: '15px', }} />
                                    </td>
                                        <td>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Sample Schemas</InputLabel>
                                                <Select
                                                    native
                                                    value={dropdownValue}
                                                    onChange={handleChangePolicy}
                                                    label="Sample Schemas"
                                                    inputProps={{
                                                        name: 'Preconfig',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                    className="policy-dropper"
                                                >
                                                    <option value={0}>Faux Safemoon</option>
                                                    <option value={1}>Progressive Tax</option>
                                                    <option value={2}>Screw the Poor</option>
                                                    <option value={3}>Deterministic</option>
                                                    <option value={4}>Willy Nilly Woo</option>
                                                </Select>

                                            </FormControl></td><td><div style={{ width: '35px', minWidth: '35px', }} />
                                        </td><td>
                                            <Button className="front-buy-button-2" onClick={() => { setMenuOpen(!isMenuOpen); }} >Preview</Button>
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
            {isMenuOpen && <div><Modal onClose={() => { setMenuOpen(false) }} conffetti>
                <h2>Here is what might happen under this Example DAO Policy Configuration!</h2>
                <div className="black-thick">
                    <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                            <td>
                                <img src="./toot_under.png" width="50px" />
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">Original Transfer Balance:</span><br /> {transactionAmount}
                            </td></tr></table>
                </div>
                <table>
                    <thead></thead>
                    <tr>
                        <td style={{ padding: '15px' }}><img src="./fox.svg" width="25" /><span class="small-text">Final Transfer Balance:</span> {calculatedTransferResults[0]}</td>
                        <td style={{ padding: '15px' }}><img src="./fire_perms.png" width="25" /><span class="small-text">Final Amount Burned:</span> {calculatedTransferResults[1]}</td>
                        <td style={{ padding: '15px' }}><img src="./crowd.png" width="25" /><span class="small-text">Final Amount to DAO:</span> {calculatedTransferResults[2]}</td>
                    </tr>
                </table>
                <div className="black-thick">
                <table>
                    <thead></thead>
                    <tr>
                        <td style={{ padding: '15px' }}><img src="./crowd.png" width="85" /></td>
                        <td style={{ padding: '15px' }}><img src="./group.png" width="25" /><span class="small-text">Holder Redistribution:</span> {calculatedTransferResults[5]}</td>
                        <td style={{ padding: '15px' }}><img src="./seal.png" width="25" /><span class="small-text">Save Ocean Fund:</span> {calculatedTransferResults[4]}</td>
                        <hr/>

                    </tr>
                </table>
                </div>
                <table style={{ margin: '0 auto' }}>
                        <thead></thead><tr>
                        <td><img src="./mint.png" width="50px" />
                                        </td>
                                        <td>
                                        <span class="small-text">Mint Operation:</span><br /> {calculatedTransferResults[3]}
                                        </td>
                                        <td width="50px">
                                
                            </td>
                            <td>
                                <img src="./glasses.png" width="50px" />
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span class="small-text">DAO Development Fund:</span><br /> {calculatedTransferResults[6]}
                            </td>
                            
                            
                            </tr></table>

                

            </Modal>
            </div>
            }
        </Container>

    );

}
Policy.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Policy);

