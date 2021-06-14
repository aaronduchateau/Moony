import React, { PureComponent } from 'react';
import RechartFront from './RechartFront';
import Policy from './Policy';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';
import { Button } from 'react-bootstrap';
import { FaBeer } from 'react-icons/fa';

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

const goToLocation = (path)=>{
    window.location.href = path;
}

const widthMetricSmall = window.screen.width < 950;
const vHeight = widthMetricSmall ? 250 : 400;
const vWidth = widthMetricSmall ? 350: 610;

export default class Home2 extends PureComponent {

    render() {
        const { currentXAU, feedXAU, isTootOpen, setMenuOpen, setTeamOpen } = this.props;
        return (
            <Container>
                <Row style={{marginTop: '100px'}}>
                    <Col s="12" xs="12">
                    
                        <ReactPlayer allowFullScreen="true" url='https://youtu.be/iH6VNv_p6Rk' height={vHeight + "px"} width={vWidth + "px"} style={{margin: '0 auto', marginTop: '0px', paddingBottom: '0px', border: '15px solid #1c1f24', borderRadius: '5px', backgroundColor: 'black' }}/>
                        <img src="./rocket.png" className="" style={{ width: '380px',maxWidth: '380px',zIndex: -1, position: 'relative', top: '-230px', right: '-370px' }} />
                    </Col>  
                </Row>
                

                <Row className="justify-content-md-center sc-hjWSAi jEjURK" style={{marginTop: "-250px"}}>
                    <Col md="auto" s="12" xs="12"> 
                        <img src={isTootOpen ? "./toot_over.png" : "./mooney_logo.png"} className="gold-image" />
                    </Col>
                    <Col md="auto" s="12" xs="12">
                        <div className="gold-text-right">
                            <div className="gold-text-right-title">
                                Mooney is a next gen transparently rediculous meme token.
          </div>

                            <br />
				      The aggressively pointless and completely<br/>absurd social commentary project,<br/> that might have a point after all...
          </div>
                    </Col>
                    </Row>

                    <Row>
                    <Col s="12" xs="12" style={{marginTop: '80px'}}>
                    
                        <p>Our Smart Contract Allows for Agile Moon Policy <br/>...Derived from You</p>
                        <img src="./guyd.png" className="" style={{ width: '228px',maxWidth: '228px',zIndex: -1, position: 'relative', top: '-160px', right: '-380px' }} />
                        <ReactPlayer fullscreen="true" url='https://youtu.be/hkUi1oFYmw0?t=43' height={vHeight + "px"} width={vWidth + "px"} style={{margin: '0 auto', marginTop: '-370px', paddingBottom: '0px', border: '15px solid #1c1f24', borderRadius: '5px', backgroundColor: 'black' }}/>

                    </Col>  
                </Row>
                <Policy isMarginTop="30px" />
               
          
                <br /><br />
                
               
                

               

                <Row className="justify-content-md-center" style={{marginTop: "30px"}}>
                    <Col md="auto" s="12" xs="12"> 
                    <div className="sc-hjWSAi jEjURK" onClick={()=>goToLocation("./purchase")}>
                          <div className="sc-gGTGfU fSjCQg grid-icon-holder">
                          <FaBeer />
                        <div className="grid-text-holder">Liquidity Generation Event</div></div></div>
                    </Col>
                    <Col md="auto" s="12" xs="12"> 
                    <div className="sc-hjWSAi jEjURK" onClick={()=>goToLocation("./about")}>
                          <div className="sc-gGTGfU fSjCQg grid-icon-holder">
                          <FaBeer />
                        <div className="grid-text-holder">Mooney Tokenomics</div></div></div>
                    </Col>
                    <Col md="auto" s="12" xs="12"> 
                    <div className="sc-hjWSAi jEjURK">
                          <div className="sc-gGTGfU fSjCQg grid-icon-holder" onClick={()=>{setMenuOpen(false);setTeamOpen(true);}}>
                          <FaBeer />
                        <div className="grid-text-holder">Meet Our Team</div></div></div>
                    </Col>
                    <Col md="auto" s="12" xs="12"> 
                    <div className="sc-hjWSAi jEjURK" onClick={()=>goToLocation("./nfts")}>
                          <div className="sc-gGTGfU fSjCQg grid-icon-holder">
                          <FaBeer />
                        <div className="grid-text-holder">NFT Marketplace</div></div></div>
                    </Col>
                </Row>    
                
                <Row>
                    <Col>
                   
                     
            <br/>
            <br/>
                <img src="./seal.png" className="icon-image-main" /><br />
                <h2>1% of DAO Funds go to Save our Oceans</h2>
                <p>Let's work together to save our most precious resource. <br /> The only time this gifting may be suspended  <br /> is if the DAO votes on a  <br /> temporary deterministic fee structure. 
                <br /> <b>#SealTheDeal #OceansHeal</b>
                </p>
                <br />
                <br />
                

                
                        
                    </Col>
                </Row>



            </Container>
        );
    }
}

