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
        const { NFTData, handleConnectSubmit, networkId } = props;
        const [topLevel, setTopLevel] = useState(null);
        const [subLevel, setSubLevel] = useState(null);

        const setCurrentLevel = (card) => {
            // top level of array
            setTopLevel(card.topLevelId);
            // drills down arbitrary 'N' levels
            setSubLevel(card.parentId);
        }

        const screenSmallClass = window.screen.width < 950 ? "card-shell" : "card-shell-small";
        
        const returnCards = () => {
            let FlipTestHolder = [];
            //let isTopLevel = (topLevel === null);
            _.each(NFTData, (item,index)=>{
                FlipTestHolder.push(<FlipTest setCurrentLevel={setCurrentLevel} card={item} handleConnectSubmit={handleConnectSubmit} networkId={networkId}/>);
            })
            return FlipTestHolder;
            };
            return (
                <div className="card-shell-container">
                    <div className={screenSmallClass}>
                        {returnCards()}
                    </div>
                    
                </div>

            );
        };

export default Cards;



