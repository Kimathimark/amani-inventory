import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import EmployeeComp from './EmployeeComp'
import './Dash.css';

function Employees() {
  return (
    <div>
        <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
                <Dashnav/>
                <EmployeeComp/>      
            </div>
        </div>  
    </div>
  )
}

export default Employees