import React, { PureComponent } from 'react';
import RechartFront from './RechartFront';
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

export default class Home2 extends PureComponent {

    render() {
        const { currentXAU, feedXAU, isTootOpen } = this.props;
        return (
            <Container>
                <Row className="justify-content-md-center" style={{marginTop: "70px"}}>
                    <Col md="auto" s="12" xs="12"> 
                        <img src={isTootOpen ? "./toot_over.png" : "./mooney_logo.png"} className="gold-image" />
                    </Col>
                    <Col md="auto" s="12" xs="12">
                        <div className="gold-text-right">
                            <div className="gold-text-right-title">
                                Mooney is a next gen transparently rediculous meme token.
          </div>

                            <br />
				      The aggressively deflationary and completely pointless social commentary project.
          </div>
                    </Col>
                </Row>
                <RechartFront currentXAU={currentXAU} feedXAU={feedXAU} />
                <Row>
                    <Col s="12" xs="12">
                    <br />
                <br />
                <br />
                    <img src="./fire_perms.png" className="icon-image-main" /><br />
                    <h2>3% burn Tax</h2>

                    <p>Everytime someone completes a transaction, <br />we basically steal 3% of your money and light it aflame. <br /> This creates scarcity. Wowa.</p>
                    <br />
                    <br />
                    <br />
                   
                        
                    </Col>
                </Row>

                <Row>
                    <Col s="12" xs="12">
                   
                    <img src="./group.png" className="icon-image-main" />
                    <br />

                    <h2>3% Socialist Snag</h2>
                    <p>Everytime someone completes a transaction, <br />we steal another 3% and give it to everyone else.
            <br /> Jesuz would approve.</p>
                    <br />
                    <br />
                    <img src="./crowd.png" className="icon-image-main" />
                    <h2>3% DAO</h2>
                    <p>3% of every transaction is distrubuted to our DAO,<br /> so we can do more cool stuff later on.
            <br /></p>
            <br />
                <br />
                <br />
                        
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                   
                    
                <img src="./seal.png" className="icon-image-main" /><br />
                <h2>1% to Save our Oceans</h2>
                <p>Let's work together to save our most precious resource.<br />
                    <b>#SealTheDeal #OceansHeal</b>
                </p>
                <br />
                <br />
                <br />

                <img src="./team.jpg" className="" style={{ width: '100%',maxWidth: '600px' }} />

                <p >Our Decentralized Team <br />Spans 10 countries, <br />and two continents. <br /><br />Concieved in perpetuity by <br />dreamers, artists, comedians, <br />philanthropists, explorers, and a couple of pirates, <br /><br />Launched live at the <br /><i style={{ color: 'pink', fontStyle: 'bold', fontSize: '45px' }} className="glow">Miami Crypto Expo<br /><br /></i></p>
                <h2><i>#KillingIt</i></h2>

                <br />
                <br />

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

