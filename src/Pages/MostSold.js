import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import './Dash.css';
import MostSoldComp from './MostSoldComp';

function MostSold() {
  return (
    <div>
        <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
              <Dashnav/>
              <MostSoldComp/>      
            </div>
        </div>      
    </div>
  )
}

export default MostSold