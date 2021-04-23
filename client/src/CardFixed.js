import React, { PureComponent, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

const CardFixed = (props) => {
    const [photoView, setPhotoView] = useState(false);
      const { handleFlip, card, handleConnectSubmit } = props;
      const imgClick = (e)=> {
        console.log('wtf');
        e.preventDefault();
        e.stopPropagation();
        setPhotoView(!photoView);
      };
      const onFlip = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        handleConnectSubmit(e);
        setPhotoView(false);
        handleFlip(e);  
      }
      const zoomedIn = photoView ? 'zoomedIn' : '';
      const qrPath = "QR/" + card.id + ".png";
  
    
      return (
        <div className="sc-fWPcDo cgpajZ_2 card-template-main" onClick={onFlip}>
        <h3 className="sc-cbDGPM eTEuVf">{card.artistName}</h3>
        <div className="mint-cardGroup">
            
                <img src={card.imgId} class={"zoom " + zoomedIn} style={{ paddingBottom: '10px' }} onClick={imgClick} />
                {photoView && <Button className="front-buy-button" onClick={onFlip}>Buy this NFT</Button>}
                {photoView && <h2 className="front-desc-text">{card.imgDesc}</h2>}
                {photoView && <div className="box-behind">&nbsp;</div>}
                
            
            
            
            
            <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP dark-blue">{card.pieceName}</h4>
            <table width="100%">
                <tr>
                    <td>
                        <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP cards-id-text">#{card.ethPrice} | {card.ethPrice} ETH | {card.bnbPrice} BSC</h4>
                        <p className="sc-ehsPrw conNwD" style={{fontSize: '25px'}}>$7,416,614.85 USD</p>
                    </td>
                    <td width="80">
                        <img src={qrPath} width="70" height="70" style={{marginRight: '20px'}} />
                    </td>
                </tr>
            </table>
        </div>
        </div>
      );
    }
  
  export default CardFixed;

