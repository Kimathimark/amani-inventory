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
//import { collection, query, getDocs, where } from "firebase/firestore";
//import { collection, addDoc } from "firebase/firestore"; 
import { collection, doc, setDoc,query, getDocs, deleteDoc, where, updateDoc} from "firebase/firestore"; 
import swal from 'sweetalert';


//routers
import {useNavigate } from "react-router-dom";

function UserInventoryComp() {



    const db = getFirestore(app);
    const [studentsList, setStudentList] = useState([]);  
    let navigate = useNavigate();
    const itemnamelRef = useRef();
    const intemdesclRef = useRef();
    const itemsizeRef = useRef();
    const itemcolorRef = useRef();
    const itempricelRef = useRef();
    const quantitylRef = useRef();
    const buyingricelRef = useRef();

    const paymentMethodRef = useRef();
 
    const [theprice, setTheprice] = useState(0);    
    const [modalShow, setModalShow] = React.useState(false);

    const saleamountRef = useRef();
    const deliveryRef = useRef();
    const delLocationRef = useRef();
    const qtybeingsoldRef = useRef();


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
  

    //fetch all Active inventory
    useEffect(() => {

        const fetchData = async () => {
        const q = query(collection(db, "inventory"), where("saleStatus", "==", "Available"));
        let studentsItem = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            studentsItem.push({ id: doc.id, ...doc.data() });
            setStudentList([...studentsItem]);   
        });
        };

        fetchData();
        //end magic
            
    }, []);
    //end fetching active students


    //make a sale
    function saleProduct(thedocId){

        handleUpdateSales()
        const mydocid = thedocId;
  
  
  
        const l = query(collection(db, "inventory"), where("docId", "==", thedocId));
        getDocs(l).then((QuerySnapshot)=>{
            QuerySnapshot.forEach((thdocc)=>{
                let itemprices = thdocc.data().itempricel;
                setTheprice(itemprices)
            })
        })
  
        window.makeTheSale = function(){
  
          console.log(mydocid)
  
          const saleamount = saleamountRef.current.value;
          const delivery = deliveryRef.current.value;
          const delLocation = delLocationRef.current.value;
          const qtybeingsold = qtybeingsoldRef.current.value;
          const paymentMethod = paymentMethodRef.current.value;
          const timestamp = new Date();
  
  
          const newCityRef = doc(collection(db, "sales"));
            setDoc(newCityRef, {
                docId:newCityRef.id,
                amountSold:saleamount,
                timeSold: timestamp,
                productId:thedocId,
                delivery: delivery,
                qtybeingsold:qtybeingsold,
                deliveryLocation: delLocation,
                deliverystatus: "pending",
                paymentMethod:paymentMethod
            }).then(()=>{
  
              let updateSale = doc(db, "inventory", thedocId);
  
              const q = query(collection(db, "inventory"), where("docId", "==", thedocId));
              getDocs(q).then((QuerySnapshot)=>{
                  let updatedQty = 0;
                  QuerySnapshot.forEach((thdoc)=>{
                      let quantity = thdoc.data().quantity;
  
                      let qtybeingsoldInt = parseInt(quantity);
  
                      updatedQty = qtybeingsoldInt
                  })
  
                  console.log(updatedQty)
  
                  let beingsold = parseInt(qtybeingsold);
  
                  let lastQty = updatedQty - beingsold;
  
                  updateDoc(updateSale, {
                    quantity: lastQty
                  }).then(()=>{
                    setModalShow(false)
                    navigate("/user/sales")
                  })
              })
  

  
            })
            
        }
      }
      //end sale
  


  return (
    <div className='dashComp'>

<div className='startupTop'>
            <h5>Inventory</h5>

        </div>
      
        <br /> <br />
        <Table striped>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Item Description</th>
          <th>Size</th>
          <th>Color</th>
          <th>Price</th>
          <th>Sale</th>
        </tr>
      </thead>
      <tbody>

      {studentsList.map((mystudent) => (
            <tr key={Math.random()}>
                <td>{mystudent.itemname}</td>
                <td>{mystudent.intemdes}</td>
                <td>{mystudent.itemsize}</td>
                <td>{mystudent.itemcolor}</td>
                <td>KES. {mystudent.itempricel}</td>
                <td><button className='btn-sm btn btn-success' onClick={() => saleProduct(mystudent.docId)}>Make a Sale</button></td>
            </tr>
        ))}
       

      </tbody>
    </Table>

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Quantity being Sold</Form.Label>
                <Form.Control type="number" ref={qtybeingsoldRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Sale Amount per Item</Form.Label>
                <Form.Control type="number" ref={saleamountRef} value={theprice}  disabled/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Pick up or Delivery?</Form.Label>
          <Form.Select aria-label="Default select example" ref={deliveryRef} >
            <option value="Pick Up">Pick Up</option>
            <option value="Delivery">Delivery</option>
            <option value="Parcel">Parcel</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Payment method</Form.Label>
          <Form.Select aria-label="Default select example" ref={paymentMethodRef} >
            <option value="Mpesa">Mpesa</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
        </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Delivery Instruction</Form.Label>
          <Form.Control as="textarea" rows={3} ref={delLocationRef}/>
        </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>

          <Button variant="primary" onClick={window.makeTheSale}>
            Make a Sale
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserInventoryComp