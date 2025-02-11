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

function LeftmenuEmployee() {
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
        


        <NavLink to="/user/inventory" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faList} className="laftNavIcon"/>
            Inventory
        </NavLink>

        <NavLink to="/user/sales" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faDollarSign} className="laftNavIcon"/>
            Sales
        </NavLink>

        <NavLink to="/user/delivery" className='leftNavLinks leftLinkCont d-flex align-items-center' activeclassname="active">
            <FontAwesomeIcon icon={faBicycle} className="laftNavIcon"/>
            Deliveries
        </NavLink>
        
        <p>LOGOUT</p>
        <div  className='leftNavLinks leftLinkCont d-flex align-items-center logout' onClick={logoutUser} activeclassname="active">
            <FontAwesomeIcon icon={faUser} className="laftNavIcon "/>
            Logout
        </div>


      

    </div>
  )
}

export default LeftmenuEmployee