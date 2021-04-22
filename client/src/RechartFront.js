import React, { PureComponent } from 'react';
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

export default class RechartFront extends PureComponent {

  render() {
    const { currentXAU, feedXAU } = this.props;
    return (
      <main className="sc-iitrsy eGMabU" style={{clear: 'both'}}>
              <div>
                 <section className="mint-container mint-cointainer-front">
                    <div className="mint-centerContainer mint-centerContainer-front">
                       <div className="sc-hjWSAi jEjURK mint-wrapper">
                          <div className="sc-gGTGfU fSjCQg">
                          <LineChart width={400} height={200} data={data}>
                            <Line type="monotone" dataKey="pv" stroke="#00a0d0" strokeWidth={4} dot={false} />
                          </LineChart>
                          </div>

                       </div>
                       <div className="mint-leftside" style={{backgroundColor: 'none', border: '0px solid'}}>
                          <div className="sc-fWPcDo cgpajZ tokens-minted" style={{background: 'none', border: '0px solid'}}>
                             <h3 className="sc-cbDGPM eTEuVf">GLDP3 Tokens Minted</h3>
                             <div className="mint-cardGroup">
                                <h4 color="#FFFFFF" className="sc-gyUeRy gNiLOP">1139049 GLDP3</h4>
                                <br/>
                                <h3 className="sc-cbDGPM eTEuVf">GLDP3 Price</h3>
                                <h4 color="#FFFFFF" className="sc-gyUeRy gNiLOP">1 GLDP3 = ${currentXAU.toFixed(2)}</h4>
                             </div>
                          </div>
                       </div>
                    </div>
                 </section>
              </div>
           </main>
        
    );
  }
}

