import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import DashComp from './DashComp'
import './Dash.css';

function Dashboard() {
  return (
    <div>
        <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
              <Dashnav/>
              <DashComp/>      
            </div>
        </div>      
    </div>
  )
}

export default Dashboard