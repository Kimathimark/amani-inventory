import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { faBars} from '@fortawesome/free-solid-svg-icons'
// import logo from '../Images/logo-main-black.png'


// import profilePictureContImage from '../Images/defprofile.png'




//routers
import {useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";

//mobile navbar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

//icons
import { faHome} from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faUsers} from '@fortawesome/free-solid-svg-icons'
import { faBookmark} from '@fortawesome/free-solid-svg-icons'
import { faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { faCoffee} from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay} from '@fortawesome/free-solid-svg-icons'
import { faUsd} from '@fortawesome/free-solid-svg-icons'
import { faMagic} from '@fortawesome/free-solid-svg-icons'
import { faVideoCamera} from '@fortawesome/free-solid-svg-icons'
import { faBicycle } from '@fortawesome/free-solid-svg-icons';

function Dashnav() {


  
    let navigate = useNavigate();
    function goToProfile(){
      navigate("/profile")
    }

  return (
    <div>
            <div className='dashNav'> 
        <div className='dashMenuIcon'>
          {/* <FontAwesomeIcon icon={faBars} className="dashNavIco "/> */}

          {[false, ].map((expand) => (
            <Navbar key={expand} bg="" className="" expand={expand} >
              <Container fluid>
              
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    {/* <img src={logo} alt="" className='dashnavLogo' /> */}
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/dashboard" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faHome} className="laftNavIcon"/>
                          Dashboard
                        </Link>
                      </div>
                      <p className='mobileMenuTitles'>ACADEMIC</p>
                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/academic" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faBicycle} className="laftNavIcon"/>
                          My Pathways
                        </Link>
                      </div>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/my-rooms" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faVideoCamera} className="laftNavIcon"/>
                          My Classes
                        </Link>
                      </div>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/teams" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faUsers} className="laftNavIcon"/>
                          Teams
                        </Link>
                      </div>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/tasks" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faBookmark} className="laftNavIcon"/>
                          Assigned Tasks      
                        </Link>
                        <span className='leftLinkNotif'>0</span>
                      </div>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/startups" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faBriefcase} className="laftNavIcon"/>
                          My Startups
                        </Link>

                      </div>

                      <p className='mobileMenuTitles'>RESEARCH & DEV</p>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/assigned-profects" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faCoffee} className="laftNavIcon"/>
                          Client's Projects
                        </Link>
                      </div>

                      <p className='mobileMenuTitles'>UPDATES & HELP</p>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/class-reports" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faCalendarDay} className="laftNavIcon "/>
                          Class Report
                        </Link>
                      </div>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/fee-report" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faUsd} className="laftNavIcon "/>
                          Fee Report
                        </Link>
                      </div>

                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/ai-assistant" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faMagic} className="laftNavIcon "/>
                          AI Assistant
                        </Link>
                      </div>
                      <p className='mobileMenuTitles'>ACCOUNT</p>
                      <div className='leftLinkCont d-flex align-items-center'>
                        <Link to="/profile" className='leftNavLinks '>
                          <FontAwesomeIcon icon={faUser} className="laftNavIcon "/>
                          Profile
                        </Link>
                      </div>
                    </Nav>

                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </div>

        <div className='searchDashCont'>
          <input placeholder='Search anything'/>
          <FontAwesomeIcon icon={faSearch} className="dashSearchIcon "/>
        </div>
        

        <div className='allNotifCont'>

          <div className='chatCont'>
            <FontAwesomeIcon icon={faEnvelope} className="dashNoticIcon "/>
            <p className='notifCounter'>0</p>
          </div>
          <div className='NotifCont'>
            <FontAwesomeIcon icon={faBell} className="dashNoticIcon "/>
            <p className='notifCounter2'>0</p>
          </div>
          <div className='profCont' onClick={goToProfile}>
            {/* <img src={userProfilePicture} alt="" /> */}
          </div>

        </div>        
  </div>
    </div>
  )
}

export default Dashnav