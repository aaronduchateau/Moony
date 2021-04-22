import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

const CardFixed = (props) => {
    const [photoView, setPhotoView] = useState(false);
      const { handleFlip, card } = props;
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
  
    
      return (
        <div className="sc-fWPcDo cgpajZ_2 card-template-main" onClick={onFlip}>
        <h3 className="sc-cbDGPM eTEuVf">#E56778</h3>
        <div className="mint-cardGroup">
            <img src={card.img} style={{ paddingBottom: '10px' }} class={"zoom " + zoomedIn}/>
            <div className="pie-holder" onClick={imgClick} >
                {!photoView && <PieChart width={320} height={320} >
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={80}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={1}
                        dataKey="value"
                        border="0"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>}
            </div>
            
            <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP dark-blue">Mesa Verde Estate</h4>
            <table width="100%">
                <tr>
                    <td>
                        <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP cards-id-text">#E56778 | 3079 ETH</h4>
                        <p className="sc-ehsPrw conNwD" style={{fontSize: '25px'}}>$7,416,614.85 USD</p>
                    </td>
                    <td width="80">
                        <img src="qr-code.svg" width="70" height="70" style={{marginRight: '20px'}} />
                    </td>
                </tr>
            </table>
        </div>
        </div>
      );
    
  }
  export default CardFixed;

