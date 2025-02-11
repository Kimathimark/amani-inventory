import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import DeliveriesComp from './DeliveriesComp'
import './Dash.css';

function Deliveries() {
  return (
    <div>
        <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
                <Dashnav/>
                <DeliveriesComp/>      
            </div>
        </div>  
    </div>
  )
}

export default Deliveries