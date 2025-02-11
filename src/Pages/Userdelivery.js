import Dashnav from '../Components/Dashnav'
import DeliveriesComp from './DeliveriesComp'
import LeftmenuEmployee from '../Components/LeftmenuEmployee';
import './Dash.css';

function Userdelivery() {
  return (
    <div>
        <div className='mainContainer'>
            <LeftmenuEmployee/>
            <div className='theMainContainer'>
                <Dashnav/>
                <DeliveriesComp/>      
            </div>
        </div>  
    </div>
  )
}

export default Userdelivery