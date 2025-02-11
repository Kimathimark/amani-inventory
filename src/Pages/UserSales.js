import React from 'react'
import Dashnav from '../Components/Dashnav'
import LeftmenuEmployee from '../Components/LeftmenuEmployee';
import UserSalesComp from './UserSalesComp';
import './Dash.css';

function UserSales() {
  return (
    <div>
        <div className='mainContainer'>
            <LeftmenuEmployee/>
            <div className='theMainContainer'>
              <Dashnav/>
              <UserSalesComp/>      
            </div>
        </div>      
    </div>
  )
}

export default UserSales