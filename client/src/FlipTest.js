import React, { PureComponent } from 'react';
import ReactCardFlip from 'react-card-flip';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import CardFixed from './CardFixed.js'
import CardFixedBack from './CardFixedBack.js'

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

export default class FlipTest extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false
        };
      this.handleFlip = this.handleFlip.bind(this);
      
    }
  
    handleFlip(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
    
  
    render() {
        const { setCurrentLevel, card } = this.props;
        if(!card){
            return false;
        }
        console.log('card working');
        console.log(card);
        
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
          <div>
          <CardFixed handleFlip={this.handleFlip} card={card}/>
          </div>
  
          <div>
          <CardFixedBack handleFlip={this.handleFlip} card={card} setCurrentLevel={setCurrentLevel} />
          </div>
        </ReactCardFlip>
      )
    }
  }



