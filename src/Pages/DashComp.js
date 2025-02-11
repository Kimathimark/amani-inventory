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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

//routers
import {useNavigate } from "react-router-dom";

function DashComp() {


  // chartjs
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  //charjs end

  //states
  const [getsalesthismonth, setSales] = useState("");
  const [totalItems, settotalItems] = useState("");
  const [inventoryValue, setinventoryValue] = useState("");

    //graph data
    const [janGraData, setJanGraData] = useState("");
    const [febGraData, setFebGraData] = useState("");
    const [marchGraData, setMarchGraData] = useState("");
    const [aprilGraData, setAprilGraData] = useState("");
    const [mayGraData, setMayGraData] = useState("");
    const [juneGraData, setJuneGraData] = useState("");
    const [julyGraData, setJulyGraData] = useState("");
    const [augGraData, setAugGraData] = useState("");
    const [sepGraData, setSepGraData] = useState("");
    const [octGraData, setOctGraData] = useState("");
    const [novGraData, setNovGraData] = useState("");
    const [decGraData, setDecGraData] = useState("");


  const db = getFirestore(app);



  ///////

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
                let totalSales = 0;
                let thisMonthsIncome = 0;

                let janData = 0;
                let febData = 0;
                let marchData = 0;
                let aprilData = 0;
                let mayData = 0;
                let juneData = 0;
                let julyData = 0;
                let augustData = 0;
                let septemberData = 0;
                let octData = 0;
                let novData = 0;
                let decData = 0;

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
  
                    let profit = qtyInt * profitdraft;


                    totalSales += profit;
                    console.log(profit)


                    mayData = profit

            
   
                  }

                  setSales(totalSales);
                  setMayGraData(totalSales);
  
  
                })
              })
          });
          };//
  
          fetchData();
          //end magic
              
      }, []);
      //end fetching active students



  //////

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Define the query to filter by date and saleStatus
  const q = query(
    collection(db, "sales"),
    where("timeSold", ">=", startOfMonth),
    where("timeSold", "<=", endOfMonth)
  );

  // Call Firestore to get the documents and calculate the total sales
  getDocs(q).then((querySnapshot) => {
    let totalSales = 0;
    querySnapshot.forEach((doc) => {
      let myamount = parseInt(doc.data().amountSold)
      totalSales += myamount;
    });
    console.log("Total sales for this month:", totalSales);
  
  });

  ///

  const j = query(
    collection(db, "inventory"),
    where("saleStatus", "==", "Available")
  );
  getDocs(j).then((querySnapshot) => {
    let totalSales = 0;
    let mynumber = querySnapshot.size;
    setinventoryValue(mynumber)
    querySnapshot.forEach((doc) => {
      let myamount = parseInt(doc.data().buyingrice)
      let quantity = parseInt(doc.data().quantity)

      let thetotals =  quantity * myamount
      totalSales += thetotals;
    });
    console.log("Total sales for this month:", totalSales);
    settotalItems(totalSales)
  });


  return (
    <div className='dashComp'>
        
        <div className='boxHolders'>

          <div className='bg-primary'>
            <h6>Total value of inventory</h6>
            <hr />
            <h3>KES. {totalItems}</h3>
          </div>
          <div className='bg-danger'>
          <h6>Items in Stock</h6>
          <hr />
          <h3>{inventoryValue}</h3>
          </div>
          <div className='bg-success'>
            <h6>Total Profit this month</h6>
            <hr />
            <h3>KES. {getsalesthismonth}</h3>
          </div>
        </div>

      <br />


        <div className='feelineGraph'>
                <Line className='theFeeLineGraph'
                      datasetIdKey='id'
                      data={{
                        labels: ['Jan', 'Feb', 'March','Apr', 'May', 'June','July', 'Aug', 'Sept','Oct', 'Nov', 'Dec'],
                        datasets: [
                          {
                            id: 1,
                            label: 'Profit',
                            data: [janGraData,febGraData, marchGraData, aprilGraData, mayGraData, juneGraData,julyGraData,augGraData, sepGraData,octGraData,novGraData,decGraData],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                          ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1
                          }
                        ],
                        
                      }}
                    />
              </div> 
        



    </div>
  )
}

export default DashComp