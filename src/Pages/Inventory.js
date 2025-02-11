import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import InvComp from './InvComp'
import './Dash.css';

function Inventory() {
  return (
    <div>
        <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
              <Dashnav/>
              <InvComp/>      
            </div>
        </div>      
    </div>
  )
}

export default Inventory