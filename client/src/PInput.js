import React, { PureComponent, useState, useEffect } from 'react';
import { LineChart, Line } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
    root: {
        color: '#00a0d0',
    },
    textField: {
        background: '#000',
        borderRadius: '5px',
    },
};

const baseAmount = 1000000000000000;
const PolicyInput = (props) => {
    const { classes, handleChange, data, topIndex, secondaryIndex, label, level } = props;
    return (
        <table style={{ width: '131px', minWidth: '131px'}}>
            <th></th>
            <tr>
                <td>
                    <div className={classes.textField + " colorBump"} styleClass={{color: "#00a0d0"}}>
                    <div style={{ position: 'absolute'}}>
                    <div style={{ width: '31px', minWidth: '31px', position: 'relative', left: '90px', top: '19px', fontSize: '12px'}}>
                            {(data[level][5] == false ? '%' : '#')} 
                        </div>
                        </div>
                        <TextField
                            id="standard-full-width"
                            label={label + '' + (data[level][5] == false ? ' %' : ' #')}
                            style={{ margin: 8 }}
                            margin="dense"
                            size="small"
                            variant="outlined"
                            color="primary"
                            value={data[topIndex][secondaryIndex]}
                            name={topIndex + "-" + secondaryIndex}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    
                       
                    </div>
                </td>
                <td>
                                            <div style={{ width: '10px', minWidth: '10px'}}>
                                            
                                            </div>
                                            </td>
            </tr>
        </table>
    );

}
PolicyInput.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PolicyInput);

