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

function MostSoldComp() {

    const db = getFirestore(app);
    const [studentsList, setStudentList] = useState([]);  
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


  return (
    <div className='dashComp'>
        <div className='startupTop'>
            <h5>Most Sold Item List</h5>
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
            </tr>
        ))}
       

      </tbody>
    </Table>

    </div>
  )
}

export default MostSoldComp