import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

export default class Card extends PureComponent {
    
    render() {
        return (
            
            <div className="sc-fWPcDo cgpajZ_2 card-template-main" >
                <h3 className="sc-cbDGPM eTEuVf">#E56778</h3>
                <div className="mint-cardGroup">
                    <img src="https://photos.zillowstatic.com/fp/9333359fae71c6c3e7ea655f6a990f3f-cc_ft_1536.jpg" width="100%" style={{ paddingBottom: '10px' }} />
                    <div className="pie-holder">
                        <PieChart width={320} height={320} onMouseEnter={this.onPieEnter}>
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
                        </PieChart>
                    </div>
                    
                    <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP dark-blue">Mesa Verde Estate</h4>
                    <table width="100%">
                        <tr>
                            <td>
                                <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP cards-id-text">#E56778 | 3079 ETH</h4>
                                <p className="sc-ehsPrw conNwD" style={{fontSize: '25px'}}>$7,416,614.85 USD</p>
                            </td>
                            <td width="80">
                                <img src="qr-code.svg" width="70" height="70" style={{marginRight: '20px'}}/>
                            </td>
                        </tr>
                    </table>
                </div>
                </div>
               
        );
    }
};



