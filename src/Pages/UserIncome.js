import React from 'react'
import Dashnav from '../Components/Dashnav'
import Leftmenu from '../Components/Leftmenu'
import IncomeComp from './IncomeComp'
import './Dash.css';

function UserIncome() {
  return (
    <div>
    <div className='mainContainer'>
        <Leftmenu/>
        <div className='theMainContainer'>
          <Dashnav/>
          <IncomeComp/>      
        </div>
    </div>   
</div>
  )
}

export default UserIncome