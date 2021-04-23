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
    uv: 390,
    pv: 800,
    amt: 500,
  },
  {
    name: 'Page G',
    uv: 490,
    pv: 300,
    amt: 100,
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
                          <br/>
                          <p style={{fontSize: '18px'}}>Let's be Real, It's probably gunna fucking tank.</p>
                          </div>

                       </div>
                       <div className="mint-leftside" style={{backgroundColor: 'none', border: '0px solid'}}>
                          <div className="sc-fWPcDo cgpajZ tokens-minted" style={{background: 'none', border: '0px solid'}}>
                             <h3 className="sc-cbDGPM eTEuVf" style={{marginBottom: '20px'}}>Tokens Minted</h3>
                             <div className="mint-cardGroup">
                                <h4 color="#FFFFFF" className="sc-gyUeRy gNiLOP" style={{fontSize: '18px'}}>7,234,113,904 MOONEY</h4>
                                <br/>
                                <h3 className="sc-cbDGPM eTEuVf">Expected Returns</h3>
                                <h4 color="#FFFFFF" className="sc-gyUeRy gNiLOP" style={{fontSize: '18px'}}>Probs <span style={{color: 'red'}}>-$6.75</span> or something after our massive launch at the <i>Miami Crypto Exp</i></h4>
                                <br/>
                                <p style={{fontSize: '18px'}}>If it works out we might do some cool shit later though. Maybe.</p>
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

