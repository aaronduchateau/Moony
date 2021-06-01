import React, { PureComponent } from 'react';
import RechartFront from './RechartFront';
import Policy from './Policy';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';
import { Button } from 'react-bootstrap';

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
                    
                        <ReactPlayer fullscreen={true} url='https://youtu.be/hkUi1oFYmw0' height={vHeight + "px"} width={vWidth + "px"} style={{margin: '0 auto', marginTop: '0px', paddingBottom: '0px', border: '15px solid black', borderRadius: '5px', backgroundColor: 'black' }}/>
                        <img src="./rocket.png" className="" style={{ width: '350px',maxWidth: '350px',zIndex: -1, position: 'relative', top: '-230px', right: '-360px' }} />
                    </Col>  
                </Row>
                

                <Row className="justify-content-md-center" style={{marginTop: "-270px"}}>
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
                    <Col s="12" xs="12">
                    <h2 style={{color: '#49ff18'}}>Introducing:</h2>
                        <h2>Hydrodynamic 6 Phased Monetary <br/>Policy Configuration Layers</h2>
                        <img src="./guyd.png" className="" style={{ width: '228px',maxWidth: '228px',zIndex: -1, position: 'relative', top: '-160px', right: '-380px' }} />
                    </Col>  
                </Row>
                <Policy isMarginTop="-300px" />
                <Row className="justify-content-md-center" style={{marginTop: "60px"}}>
                    <Col md="auto" s="12" xs="12"> 
                        <img src="./moon_yellin.jpg" className="gold-image" style={{border: '5px solid black', borderRadius: '5px', backgroundColor: 'black' }}/>
                    </Col>
                    <Col md="auto" s="12" xs="12">
                        <div className="gold-text-right" style={{marginTop: '30px' }}>
                            <div className="gold-text-right-title">
                                Crypto Laws are changing.
          </div>

                            <br />
				      On May 5th, 2021 Janet Yellin warned of new incoming crypto regulations. Our adjustable Monetary Policy and Launch Strategy, were designed to survive these changes...<br/><br/>
                      <Button className="front-buy-button-3" href="./is-security" onClick={() => {  }} >Learn more about Tokens vs. Securities</Button>
          </div>
                    </Col>
                    </Row>
                    <br />
                    <br />
                <RechartFront currentXAU={currentXAU} feedXAU={feedXAU} />
                <br />
                <br />
                <br />
                <Row>
                    <Col s="12" xs="12" className="jEjURK" style={{padding: '40px'}}>
                        
                    <h2 style={{color: '#49ff18'}}>Our Launch Configuration:</h2>
                        <p style={{ marginBottom: '20px', fontSize: '18px' }}>Here is an example of what our <br/>first configuration might look like at<br/> our at our <b>ShitCoin 2021 Miami</b> Token Launch, <br/> given a sample transaction size!</p>
                        <img src="./guy2.png" className="" style={{ width: '228px',maxWidth: '228px',zIndex: -1, position: 'relative', top: '-240px', left: '-300px' }} />
                        
                    </Col>  
                </Row>
                <Row style={{ position: 'relative', top: '-660px'}}>
                    <Col s="12" xs="12" >
                    <img src="./samplep.png" className="pink-sample" style={{ marginTop: '260px', marginBottom: '0px'}} />
                    </Col>
                </Row>
                <Row>
                    <Col s="12" xs="12">
                    
                    <br />
                    <br />
                    <img src="./fire_perms.png" className="icon-image-main" /><br />
                    <h2>Configurable burn Tax</h2>

                    <p>Everytime someone completes a transaction, <br />we take part of the transaction and light it aflame. <br /> In theory, this creates scarcity. <br />If we need to adjust the rate, or even turn this off, <br />our DAO has the ability to do that.</p>
                    <br />
                    <br />
                    <br />
                   
                        
                    </Col>
                </Row>

                <Row>
                    <Col s="12" xs="12">
                   
                    <img src="./group.png" className="icon-image-main" />
                    <br />

                    <h2>Socialist Snag</h2>
                    <p>Under our 'launch configuration' <br />(which we can modify at a later time), <br />everytime someone completes a transaction, <br />a small portion of that transfer goes to our DAO. <br />Every quarter we can vote to redistribute back to Hodlers<br />  at an unspecified date(assuming that's what the DAO wants to do!)
            <br /> Earn rewards for chilling out!</p>
                    <br />
                    <br />
                    <img src="./crowd.png" className="icon-image-main" />
                    <h2>Configurations approved by DAO</h2>
                    <p>Every quarter, our DAO will vote as to whether  <br />or not to keep the current Monetary Policy,  <br />or switch to another later on. 
                    <br />This means our project can adapt our policy <br /> directly to benefit the current projects <br /> goals, usecases, and even become compliant <br />with upcoming regulations  <br />(when OTHER tokens can't!)
            <br /></p>
            <br />
                <br />
                <br />
                        
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                   
                    
                <img src="./seal.png" className="icon-image-main" /><br />
                <h2>1% of DAO Funds go to Save our Oceans</h2>
                <p>Let's work together to save our most precious resource. <br /> The only time this gifting may be suspended  <br /> is if the DAO votes on a  <br /> temporary deterministic fee structure. 
                <br /> <b>#SealTheDeal #OceansHeal</b>
                </p>
                <br />
                <br />
                <br />
                <Row className="justify-content-md-center" style={{marginTop: "30px"}}>
                    <Col md="auto" s="12" xs="12"> 
                        <img src="./dogdev.jpg" className="gold-image" style={{border: '5px solid black', borderRadius: '5px', backgroundColor: 'black' }}/>
                    </Col>
                    <Col md="auto" s="12" xs="12">
                        <div className="gold-text-right" style={{marginTop: '30px' }}>
                            <div className="gold-text-right-title">
                                Meet our All-Star Team
          </div>

                            <br />
				      <b>Important Update:</b> <br/>Currently our Lead Dev is this Dog.

His code throws a bunch of exceptions <br/>(but he submits the most pull requests.)<br/><br/>
                      <Button className="front-buy-button-3" onClick={()=>{setMenuOpen(false);setTeamOpen(true);}} >View Our Team Members</Button>
          </div>
                    </Col>
                    </Row>

                <br />
                <br />
                <br />
                <h2 style={{color: '#49ff18'}}>Project Roadmap...Maybe?</h2>
                <img src="./roadmap.png" className="" style={{ width: '100%',maxWidth: '800px' }} />

                <br />
                <br />
                <br />
                        
                    </Col>
                </Row>



            </Container>
        );
    }
}

