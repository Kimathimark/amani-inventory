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

function IncomeComp() {


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
            const itemprice = doc.data().itempricel;
            const buyingrice = doc.data().buyingrice;

            const buyingriceInt = parseInt(buyingrice);
            const itempriceInt  = parseInt(itemprice);




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

                const dateAdded = timeSold.toDate().toDateString();
                const timeAdded = timeSold.toDate().toLocaleTimeString();

                let amountSoldInt = parseInt(amountSold);
                let qtyInt = parseInt(qtybeingsold);

                if(docId == productId){

                  let thetotal = amountSoldInt * qtyInt;

                  const profitdraft = itempriceInt - buyingriceInt;

                  let profit = qtyInt * profitdraft



                  studentsItem.push({ id: doc.id, ...doc.data(), amountSold, profit, profitdraft,  delivery, deliveryLocation, dateAdded,timeAdded, deliverystatus, thetotal});
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
    <div className='dashComp'>
        <div className='startupTop'>
            <h5>Income</h5>
        </div>

        <br /> <br />
        <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Sale From</th>
          <th>Total Sale Amount</th>
          <th>Profit Made</th>
        </tr>
      </thead>
      <tbody>

      {studentsList.map((mystudent) => (
            <tr key={Math.random()}>
              {/* amountSold,  delivery, deliveryLocation, timeSold, deliverystatus */}
                <td>{mystudent.dateAdded}</td>
                <td>{mystudent.timeAdded}</td>
                <td>{mystudent.itemname}</td>
                <td> KES. {mystudent.thetotal}</td>
                <td>{mystudent.profit}</td>
            </tr>
        ))}
       

      </tbody>
    </Table>

    </div>
  )
}

export default IncomeComp