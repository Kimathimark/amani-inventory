import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import ExpenseComp from './ExpenseComp';
import './Dash.css';

function Expenses() {
  return (
    <div>
       <div className='mainContainer'>
            <Leftmenu/>
            <div className='theMainContainer'>
              <Dashnav/>
              <ExpenseComp/>      
            </div>
        </div>   
    </div>
  )
}

export default Expenses