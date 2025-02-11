import React, { useRef, useState }  from 'react'
import logo from '../Images/thelogo.png'
import {NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faUsers} from '@fortawesome/free-solid-svg-icons'
import { faBookmark} from '@fortawesome/free-solid-svg-icons'
import { faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { faCoffee} from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay} from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import { faMagic} from '@fortawesome/free-solid-svg-icons'
import { faList} from '@fortawesome/free-solid-svg-icons'
import { faDollarSign} from '@fortawesome/free-solid-svg-icons'
import { faBicycle } from '@fortawesome/free-solid-svg-icons';

// firebase
import {app} from '../firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//routers
import {useNavigate } from "react-router-dom";

function Leftmenu() {

    let navigate = useNavigate();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {

        if (user) {

        } else {
        // User is signed out
        navigate("/")
        }
    })

    function logoutUser(){
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/")  
        }).catch((error) => {

        });
    }

  return (
   <div className='leftNav'>
   
        <img src={logo} alt="" className='dashnavLogo' />
      
      
        <br />
        <p>HOME</p>
        

        <NavLink to="/dashboard" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faHome} className="laftNavIcon activelaftNavIcon"/>
            Dashboard
        </NavLink>

        <p>ITEMS</p>

        <NavLink to="/inventory" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faList} className="laftNavIcon"/>
            Inventory
        </NavLink>

        <NavLink to="/sales" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faDollarSign} className="laftNavIcon"/>
            Sales
        </NavLink>


        <NavLink to="/income" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faMoneyBill} className="laftNavIcon"/>
            Income
        </NavLink>


        <NavLink to="/expenses" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faBookmark} className="laftNavIcon"/>
            Expenses  
        </NavLink>


        <NavLink to="/mostsold" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faBriefcase} className="laftNavIcon"/>
            Most Sold Items  
        </NavLink>
         

        {/* className={`leftLinkCont d-flex align-items-center ${activeMenu3}`} */}

        <p>OTHERS</p>

        <NavLink to="/deliveries" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faBicycle} className="laftNavIcon"/>
            Deliveries
        </NavLink>
        <NavLink to="/employees" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faUsers} className="laftNavIcon "/>
            Employees
        </NavLink>

        {/* <NavLink to="/reports" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faCalendarDay} className="laftNavIcon "/>
            Reports
        </NavLink> */}

        
        <p>LOGOUT</p>
        <div  className='leftNavLinks leftLinkCont d-flex align-items-center logout' onClick={logoutUser} activeclassname="active">
            <FontAwesomeIcon icon={faUser} className="laftNavIcon "/>
            Logout
        </div>


      

    </div>
  )
}

export default Leftmenu