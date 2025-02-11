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
import { collection, doc, setDoc,query, getDocs, deleteDoc, where} from "firebase/firestore"; 
import swal from 'sweetalert';

//routers
import {useNavigate } from "react-router-dom";

function UserSalesComp() {
    let navigate = useNavigate();
    const itemnamelRef = useRef();
    const intemdesclRef = useRef();
    const itemsizeRef = useRef();
    const itemcolorRef = useRef();
    const itempricelRef = useRef();
    const [studentsList, setStudentList] = useState([]);    
    const [modalShow, setModalShow] = React.useState(false);

  


    const db = getFirestore(app);

     //fetch all Active Students
    useEffect(() => {
        
        const fetchData = async () => {
        const q = query(collection(db, "inventory"));
        let studentsItem = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const docId = doc.data().docId;  
            const buyingrice = doc.data().buyingrice;  


            const m = query(collection(db, "sales"), where("productId", "==", docId));
            getDocs(m).then((QuerySnapshot)=>{
              QuerySnapshot.forEach((thedoc)=>{

                const productId = thedoc.data().productId;
                const amountSold = thedoc.data().amountSold;
                const delivery = thedoc.data().delivery;
                const deliveryLocation = thedoc.data().deliveryLocation;
                const timeSold =thedoc.data().timeSold;
                const deliverystatus = thedoc.data().deliverystatus;
                const qtybeingsold = thedoc.data().qtybeingsold;
                const paymentMethod = thedoc.data().paymentMethod;

                if(docId == productId){
                  studentsItem.push({ id: doc.id, ...doc.data(), amountSold,paymentMethod,buyingrice, delivery,qtybeingsold, deliveryLocation, timeSold, deliverystatus});
                  setStudentList([...studentsItem]); 
                }


              })
            })
        });
        };//

        fetchData();
        //end magic
            
    }, []);
    //end fetching active students



  return (
    <div>

<div className='dashComp'>
        <div className='startupTop'>
            <h5>Sales</h5>
        </div>

        
        <br /> <br />
        <Table striped>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Item Description</th>
          <th>Size</th>
          <th>Color</th>
          <th>Quantity</th>
          <th>Amount per item</th>
          <th>Payment Method</th>
          <th>Delivery Status</th>
        </tr>
      </thead>
      <tbody>

      {studentsList.map((mystudent) => (
            <tr key={Math.random()}>
              {/* amountSold,  delivery, deliveryLocation, timeSold, deliverystatus */}
                <td>{mystudent.itemname}</td>
                <td>{mystudent.intemdes}</td>
                <td>{mystudent.itemsize}</td>
                <td>{mystudent.itemcolor}</td>
                <td>{mystudent.qtybeingsold}</td>
                <td>KES. {mystudent.amountSold}</td>
                <td>{mystudent.paymentMethod}</td>
                <td>{mystudent.deliverystatus}</td>

            </tr>
        ))}
       

      </tbody>
    </Table>
    </div>
    </div>
  )
}
export default UserSalesComp