import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Card from './Card';
import FlipTest from './FlipTest';
import _ from 'lodash';

const data = [
    { name: 'Group A', value: 70 },
    { name: 'Group B', value: 30 },

];
const COLORS = ['#56e2f6', '#00a0d0', '#FFBB28', '#FF8042'];

const Cards = (props) => {
        const { NFTData } = props;
        const [topLevel, setTopLevel] = useState(null);
        const [subLevel, setSubLevel] = useState(null);

        const setCurrentLevel = (card) => {
            // top level of array
            setTopLevel(card.topLevelId);
            // drills down arbitrary 'N' levels
            setSubLevel(card.parentId);
        }
        
        const returnCards = () => {
            let FlipTestHolder = [];
            let isTopLevel = (topLevel === null);
            _.each(isTopLevel ? NFTData : NFTData[topLevel], (item,index)=>{
                console.log(item[1]);
                if(isTopLevel){
                    FlipTestHolder.push(<FlipTest setCurrentLevel={setCurrentLevel} card={item[1]}/>);
                } else {
                    FlipTestHolder.push(<FlipTest setCurrentLevel={setCurrentLevel} card={item}/>);
                }
                    
                
                //we are at the top level 
                //if(item[index].parentId === null){
                //    const card = item[index];
                //    FlipTestHolder.push(
                //        <FlipTest setCurrentLevel={setCurrentLevel} card={card}/>
                //    );
                //}
                
            })
            return FlipTestHolder;
            };
            return (
                <div className="card-shell-container">
                    <div className="card-shell">
                        {returnCards()}
                    </div>
                </div>

            );
        };

export default Cards;



