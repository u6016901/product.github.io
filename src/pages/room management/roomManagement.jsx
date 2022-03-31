import '../../App.css';
import { useHistory } from 'react-router'
import React from "react";
import SearchRoomManagement from "./room management components/searchRoomManagement"
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
              <h4 class="headContent card-title">ROOM MANAGEMENT</h4>
              <p class="content card-text">Suvarnabhumi Campus</p>
            </div>
        </div>
        <SearchRoomManagement />   
    </body>
  );
}
 
export default RoomManagement;