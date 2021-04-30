import React, { PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';

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
      <Container>
        <Row className="justify-content-md-center" style={{marginTop: '50px'}}>
        <Col md="auto">
                       <div className="" style={{backgroundColor: 'none', border: '0px solid', width: '342px'}}>
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
                 
               
                       </Col>
          <Col md="auto">
             
                       <div className="sc-hjWSAi jEjURK">
                          <div className="sc-gGTGfU fSjCQg" style={{padding: '10px'}}>
                          <LineChart width={window.screen.width < 1480 ? 280 : 400} height={200} data={data} style={{display: 'block', margin: '0 auto'}}>
                            <Line type="monotone" dataKey="pv" stroke="#00a0d0" strokeWidth={4} dot={false} />
                          </LineChart>
                          <br/>
                          <p style={{fontSize: '18px'}}>Let's be Real, It's probably gunna fucking tank.</p>
                          </div>
                       </div>
                       </Col>
                       </Row>
           </Container>
        
    );
  }
}

