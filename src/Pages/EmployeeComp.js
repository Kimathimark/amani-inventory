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

function EmployeeComp() {



    const employeenameRef = useRef();
    const employeetypeRef = useRef();
    const usernameRef = useRef();
    const employeepassRef = useRef();

    const db = getFirestore(app);


    const [studentsList, setStudentList] = useState([]);    
    const [modalShow, setModalShow] = React.useState(false);

    function addExpenses(){

        const employeename = employeenameRef.current.value;
        const employeetype = employeetypeRef.current.value;
        const username = usernameRef.current.value;
        const employeepass = employeepassRef.current.value;
        const timestamp = new Date();

        const newCityRef = doc(collection(db, "employees"));
        setDoc(newCityRef, {
            employeename: employeename,
            employeetype: employeetype,
            username: username,
            employeepass:employeepass,
            docId:newCityRef.id,
            myTimestamp: timestamp
        }).then(()=>{
            
            setModalShow(false)
            window.location.reload();
        })

    }


        //start delete
        function deleteExpense(docid){
            const q = query(collection(db, "employees"), where("docId", "==", docid));
                getDocs(q).then((QuerySnapshot)=>{
                    QuerySnapshot.forEach((thdoc)=>{
    
                        let itemname = thdoc.data().itemname;
                        console.log(itemname)
    
                        swal({
                          title: `Delete Employee`,
                          text: `Are you sure you want to delete this Employee ?`,
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            deleteDoc(doc(db, "employeese ", docid))
                            .then(()=>{
                              swal("Deleted", "" , "success");
                              swal(`Employee has been deleted!`, {
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
                    Add an Employee
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control type="text" ref={employeenameRef} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee Type</Form.Label>
                    <Form.Select aria-label="Default select example" ref={employeetypeRef} >
                        <option value="Attendant">Attendant</option>
                        <option value="Delivery Person">Delivery Person</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"ref={usernameRef}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"ref={employeepassRef}/>
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
            const q = query(collection(db, "employees"));
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
            <h5>Employees</h5>
            <button onClick={() => setModalShow(true)}> <FontAwesomeIcon icon={faAdd} className="liveSessionIcon"/> Add an Employee</button>
        </div>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />

         
        <br /> <br />
        <Table striped>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Type</th>
          <th>Username</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>



      {studentsList.map((mystudent) => (
            <tr key={Math.random()}>
                <td>{mystudent.employeename}</td>
                <td>{mystudent.employeetype}</td>
                <td>{mystudent.username}</td>
                <td><button className='btn-sm btn btn-warning' onClick={() => deleteExpense(mystudent.docId)}>Delete</button></td>
            </tr>
        ))}
       

      </tbody>
    </Table>


    </div>
  )
}

export default EmployeeComp