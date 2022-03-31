import '../../App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useHistory } from 'react-router'
import React, { useEffect, useState } from "react";
import SearchReservationManagement from "./reservation management components/searchReservationManagement"
import cardImg from '../../assets/cardImg.png';

 
function RoomManagement() {

  let history = useHistory();

  const access_token = sessionStorage.getItem("token")

  if(!access_token){
    history.push("/")
    window.location.reload("/");
  }

  return (
    <body>
       <div class="card">
          <img class="card-img-top" src={cardImg}></img>
            <div class="card-img-overlay">
              <h4 class="headContent card-title">RESERVATION MANAGEMENT</h4>
              <p class="content card-text">Suvarnabhumi Campus</p>
            </div>
        </div>
        <SearchReservationManagement />   
    </body>
  );
}
 
export default RoomManagement;