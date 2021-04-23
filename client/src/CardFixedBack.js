import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { ethers, utils } from 'ethers';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

const CardFixedBack = (props) => {
    const [photoView, setPhotoView] = useState(false);
      const { handleFlip, setCurrentLevel, card, networkId } = props;
      const imgClick = (e)=> {
        e.preventDefault();
        e.stopPropagation();
        setPhotoView(!photoView);
        //setPhotoView(!photoView);
        //alert('worked');
      };
      const onFlip = (e)=>{
        setPhotoView(false);
        handleFlip(e);
      }
      const zoomedIn = photoView ? 'zoomedIn' : '';

      const onClickCurrentLevel = (card) => {
        setCurrentLevel(card);
      }

      

      async function payWithMetamask(e,sender, receiver, strEther) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`payWithMetamask(receiver=${receiver}, sender=${sender}, strEther=${strEther})`)
        const networkIsEth = networkId === 1;
        const networkIsBsc = networkId === 56;
        
        let price = '';
        if(networkIsEth){
          price = card.bnbPrice;
        }
        if(networkIsBsc){
          price = card.ethPrice;
        }
    
        let ethereum = window.ethereum;
    
    
        // Request account access if needed
        await ethereum.enable();
    
    
        let provider = new ethers.providers.Web3Provider(ethereum);
    
        // Acccounts now exposed
        const params = [{
            from: sender,
            to: receiver,
            value: ethers.utils.parseUnits(price, 'ether').toHexString()
        }];
    
        const transactionHash = await provider.send('eth_sendTransaction', params)
        console.log('transactionHash is ' + transactionHash);
    }

    
    
  
    
      return (
        <div className="sc-fWPcDo cgpajZ_2 card-template-main" onClick={onFlip}>
        <h3 className="sc-cbDGPM eTEuVf">#E56778</h3>
        <div className="mint-cardGroup">
            <h3>Pre-Order NFT</h3><br/>
            <p style={{fontSize: '15px'}}>NFT will be minted and delievered on May 5th</p>
            <Button type="submit" className="back-o-card-buts" onClick={(e)=>{payWithMetamask(e,'0x46C52823C6cfE568b99824ae1d3201c4E6c581fC','0xebDF5777157DFf997a279975efb106381d035dd7','.01');}}>Buy</Button>
            <br/>
            <p style={{fontSize: '15px'}}>Share on Social Media</p>
            <Button type="submit" className="back-o-card-buts">Facebook</Button>
            <Button type="submit" className="back-o-card-buts">Twitter</Button>

        </div>   
        </div>
      );
    
  }
  export default CardFixedBack;

