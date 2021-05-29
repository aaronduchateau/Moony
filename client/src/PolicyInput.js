import React, { PureComponent, useState, useEffect } from 'react';
import { LineChart, Line } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
    root: {
        background: "white"
    },
    textField: {
        width: '8ch',
        background: "white",
    },
};

const baseAmount = 1000000000000000;
const PolicyInput = (props) => {
    const { classes, handleChange } = props;

    const [data, setData] = useState([
        [6666666666666, 1, 3, 0, 0, false],
        [13333333333332, 1, 3, 0, 0, false],
        [26666666666664, 1, 3, 0, 0, false],
        [333333333333330, 1, 3, 0, 0, false],
        [3399999999999996, 1, 3, 0, 0, false],
        [77777777777777777, 1, 3, 0, 0, false],
    ]);
    return (
        <table>
            <th></th>
            <tr>
                <td>
                    %&nbsp;</td>
                <td>
                    <div style={{ backgroundColor: '#e6e6e6', border: '1px solid grey', borderRadius: "10px" }} className={classes.textField}>
                        <TextField
                            id="standard-full-width"
                            label="Burn"
                            style={{ margin: 8 }}
                            margin="dense"
                            size="small"
                            variant="outlined"
                            color="primary"
                            value={data[0][1]}
                            name="0-1"
                            onChange={handleChange}
                            error
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
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

