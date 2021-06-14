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

export default class Media extends PureComponent {

    render() {
       
        return (
            <Container>
                <Row style={{marginTop: '100px'}}>
                    <Col s="12" xs="12">
                    
                        <ReactPlayer fullscreen="true" url='https://youtu.be/hkUi1oFYmw0' height={vHeight + "px"} width={vWidth + "px"} style={{margin: '0 auto', marginTop: '0px', paddingBottom: '0px', border: '15px solid black', borderRadius: '5px', backgroundColor: 'black' }}/>
                        <img src="./rocket.png" className="" style={{ width: '380px',maxWidth: '380px',zIndex: -1, position: 'relative', top: '-230px', right: '-370px' }} />
                    </Col>  
                </Row>
                


                    <Row style={{marginTop: '-80px'}}>
                    <Col s="12" xs="12">
                    
                        <ReactPlayer fullscreen="true" url='https://youtu.be/lzjvk6l1bKM' height={vHeight + "px"} width={vWidth + "px"} style={{margin: '0 auto', marginTop: '0px', paddingBottom: '0px', border: '15px solid black', borderRadius: '5px', backgroundColor: 'black' }}/>
                    </Col>  

                    
                </Row>
                <Row style={{marginTop: '-80px'}}>
                    <Col s="12" xs="12">
                    
                    <ReactPlayer allowFullScreen="true" url='https://www.youtube.com/watch?v=AKVsck_1Vgkk' height={vHeight + "px"} width={vWidth + "px"} style={{ margin: '0 auto', marginTop: '0px', paddingBottom: '0px', border: '15px solid #1c1f24', borderRadius: '5px', backgroundColor: 'black' }} />
                    </Col>  

                    
                </Row>


                </Container>

                
               

        
        );
    }
}

