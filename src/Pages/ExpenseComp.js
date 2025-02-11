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


function ExpenseComp() {


    const expensedescRef = useRef();
    const spentonRef = useRef();
    const expenseamountRef = useRef();
    const expensedateRef = useRef();
    const db = getFirestore(app);


    const [studentsList, setStudentList] = useState([]);    
    const [modalShow, setModalShow] = React.useState(false);

    function addExpenses(){

        const expensedesc = expensedescRef.current.value;
        const spenton = spentonRef.current.value;
        const expenseamount = expenseamountRef.current.value;
        const expensedate = expensedateRef.current.value;
        const timestamp = new Date();

        const newCityRef = doc(collection(db, "expenses"));
        setDoc(newCityRef, {
            expensedesc: expensedesc,
            spenton: spenton,
            expenseamount: expenseamount,
            expensedate:expensedate,
            docId:newCityRef.id,
            myTimestamp: timestamp
        }).then(()=>{
            
            setModalShow(false)
            window.location.reload();
        })

    }


        //start delete
        function deleteExpense(docid){
            const q = query(collection(db, "expenses"), where("docId", "==", docid));
                getDocs(q).then((QuerySnapshot)=>{
                    QuerySnapshot.forEach((thdoc)=>{
    
                        let itemname = thdoc.data().itemname;
                        console.log(itemname)
    
                        swal({
                          title: `Delete Expense`,
                          text: `Are you sure you want to delete this Expense ?`,
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            deleteDoc(doc(db, "expenses", docid))
                            .then(()=>{
                              swal("Deleted", "" , "success");
                              swal(`Expense has been deleted!`, {
                                icon: "success",
                              }).then(()=>{
                                window.location.reload();
                              })
                              
                            })
     
                          } else {
                            swal("Cancelled");
                          }
                        });
                               
                    })
                })
        }
        //end delete

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add an Expense
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Expsense description</Form.Label>
                <Form.Control type="text" ref={expensedescRef} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Spent On</Form.Label>
                <Form.Control type="text" ref={spentonRef}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text"ref={expenseamountRef}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <Form.Control type="datetime-local"ref={expensedateRef}/>
              </Form.Group>

            


            </Modal.Body>
            <Modal.Footer>
              <Button className='btn btn-dark' onClick={props.onHide}>Close</Button>
              <Button onClick={addExpenses}>Submit</Button>
            </Modal.Footer>
          </Modal>
        );
      }


    //fetch all Active inventory
    useEffect(() => {
        
        const fetchData = async () => {
        const q = query(collection(db, "expenses"));
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
            <h5>Expenses</h5>
            <button onClick={() => setModalShow(true)}> <FontAwesomeIcon icon={faAdd} className="liveSessionIcon"/> Add an Expense</button>
        </div>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />

         
        <br /> <br />
        <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Expense Description</th>
          <th>Spent On</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>

      {studentsList.map((mystudent) => (
            <tr key={Math.random()}>
                <td>{mystudent.expensedate}</td>
                <td>KES. {mystudent.expenseamount}</td>
                <td>{mystudent.expensedesc}</td>
                <td>{mystudent.spenton}</td>
                <td><button className='btn-sm btn btn-warning' onClick={() => deleteExpense(mystudent.docId)}>Delete</button></td>
            </tr>
        ))}
       

      </tbody>
    </Table>


    </div>
  )
}

export default ExpenseComp