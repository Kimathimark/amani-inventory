import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import SalesComp from './SalesComp'
import './Dash.css';

function Sales() {
  return (
    <div>
        <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
              <Dashnav/>
              <SalesComp/>      
            </div>
        </div>    
    </div>
  )
}

export default Sales