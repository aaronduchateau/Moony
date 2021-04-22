import React, { PureComponent } from 'react';
import RechartFront from './RechartFront';
import { LineChart, Line } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class Home extends PureComponent {
  
  render() {
    const { currentXAU, feedXAU } = this.props;
    return (
        <div>
				<div className="picture-text">
					<img src="goldsaved.png" className="gold-image" />
					<div className="gold-text-right">
						<div className="gold-text-right-title">
							Immutable Gold that you can leverage and collateralize.
				</div>
				<br />
				Tokenized at Market Price. Embeded in the blockchain. Web3 ready. </div>
				</div>
				<RechartFront currentXAU={currentXAU} feedXAU={feedXAU}/>
		</div>
    );
  }
}

