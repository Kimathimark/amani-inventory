import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd} from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {app} from '../firebase.js'
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc,query, getDocs, deleteDoc, where, updateDoc} from "firebase/firestore"; 
import swal from 'sweetalert';
//routers
import {useNavigate } from "react-router-dom";
function DeliveriesComp() {

    let navigate = useNavigate();
    const delstatusRef = useRef();
    const [studentsList, setStudentList] = useState([]);    
    const [modalShow, setModalShow] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    function handleUpdateSales() {
        // Run your update sales function here
        // ...
        // Then show the modal
        setShowModal(true);
      }
  
      function handleCloseModal() {
        setShowModal(false);
      }
    


    const db = getFirestore(app);

     //fetch all Active Students
    useEffect(() => {
        
        const fetchData = async () => {
        const q = query(collection(db, "inventory"));
        let studentsItem = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const docId = doc.data().docId;  


            const m = query(collection(db, "sales"), where("productId", "==", docId));
            getDocs(m).then((QuerySnapshot)=>{
              QuerySnapshot.forEach((thedoc)=>{

                const productId = thedoc.data().productId;
                const amountSold = thedoc.data().amountSold;
                const delivery = thedoc.data().delivery;
                const deliveryLocation = thedoc.data().deliveryLocation;
                const timeSold =thedoc.data().timeSold;
                const deliverystatus = thedoc.data().deliverystatus;
                const mydocId =  thedoc.data().docId;

                if(docId == productId){
                  studentsItem.push({ id: doc.id, ...doc.data(), amountSold,  delivery, deliveryLocation, timeSold, deliverystatus, mydocId});
                  setStudentList([...studentsItem]); 
                }


              })
            })
        });
        };

        fetchData();
        //end magic
            
    }, []);
    //end fetching active students



    //make a sale
    function updateStatus(thedocId){

        handleUpdateSales()
        const mydocid = thedocId;
  
        window.makeTheSale = function(){
  
          console.log(mydocid)
  

          const delstatus = delstatusRef.current.value;
          const updateSale = doc(db, "sales", thedocId);
          updateDoc(updateSale, {
                deliverystatus: delstatus
          }).then(()=>{
            setModalShow(false)
            window.location.reload();
          })
    
        }
  
  
  
      }
      //end sale




  return (
    <div>
<div className='dashComp'>
        <div className='startupTop'>
            <h5>Deliveries</h5>
        </div>

        
        <br /> <br />
        <Table striped>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Amount Sold</th>
          <th>Pickup/Delivery</th>
          <th>Delivery Instructions</th>
          <th>Delivery Status</th>
          <th>Update Delivery Status</th>
        </tr>
      </thead>
      <tbody>

      {studentsList.map((mystudent) => (
            <tr key={Math.random()}>
              {/* amountSold,  delivery, deliveryLocation, timeSold, deliverystatus */}
                <td>{mystudent.itemname}</td>
                <td> KES. {mystudent.amountSold}</td>
                <td>{mystudent.delivery}</td>
                <td>{mystudent.deliveryLocation}</td>
                <td>{mystudent.deliverystatus}</td>
                <td><button className='btn-sm btn btn-warning' onClick={() => updateStatus(mystudent.mydocId)}>Update Delivery</button></td>

            </tr>
        ))}
       

      </tbody>
    </Table>
    </div>


    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Pick up or Delivery?</Form.Label>
          <Form.Select aria-label="Default select example" ref={delstatusRef} >
            <option value="Picked Up">Picked Up</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
        </Form.Select>
        </Form.Group>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>

          <Button variant="primary" onClick={window.makeTheSale}>
            Update Delivery Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeliveriesComp