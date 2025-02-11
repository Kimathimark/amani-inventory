import React from 'react'
import Dashnav from '../Components/Dashnav'
import LeftmenuEmployee from '../Components/LeftmenuEmployee';
import UserInventoryComp from './UserInventoryComp';
import './Dash.css';

function UserInventory() {
  return (
    <div>
        <div className='mainContainer'>
            <LeftmenuEmployee/>
            <div className='theMainContainer'>
              <Dashnav/>
              <UserInventoryComp/>      
            </div>
        </div>      
    </div>
  )
}

export default UserInventory