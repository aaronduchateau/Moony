import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

const CardFixedBack = (props) => {
    const [photoView, setPhotoView] = useState(false);
      const { handleFlip, setCurrentLevel, card } = props;
      console.log('wat');
      console.log(handleFlip);
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
  
    
      return (
        <div className="sc-fWPcDo cgpajZ_2 card-template-main" onClick={onFlip}>
        <h3 className="sc-cbDGPM eTEuVf">#E56778</h3>
        <div className="mint-cardGroup">
            <Button type="submit" className="back-o-card-buts">Fractionalize</Button>
            <Button type="submit" className="back-o-card-buts">Sell</Button>
            <Button type="submit" className="back-o-card-buts">Transfer</Button>
            <Button type="submit" className="back-o-card-buts">Update</Button>
            <Button type="submit" className="back-o-card-buts" onClick={()=>{onClickCurrentLevel(card)}}>Children</Button>
        </div>   
        </div>
      );
    
  }
  export default CardFixedBack;

