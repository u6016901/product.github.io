import React, { useEffect, useState } from "react";
import ModifyRoom from './modifyRoom';
import DeleteRoom from '../../../components/deleteRoom';
import DisableRoom from "./disableRoom";



function Card(props) {

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);


  let data = props.data;
  let roomId = data.roomId;

  return (
    
    <div className="col-3">
    <div className="card_room_management_room">
      <i class='card_room_management_room_writeimg bx bx-edit' onClick={() => {setOpenModal1(true);}}></i>
      {openModal1 && <ModifyRoom closeModal={setOpenModal1} roomId = {roomId} />} 
      <i class='card_room_management_room_delete bx bx-trash' onClick={() => {setOpenModal2(true);}}></i>
      {openModal2 && <DeleteRoom closeModal={setOpenModal2} roomId = {roomId} />} 
      <i class='card_room_management_room_clockimg bx bx-time-five'></i>
      <div className="card_room_management_room_roomname">{data.roomName}</div>
      <div className="card_room_management_room_time">{data.openTime.slice(0,5)} - {data.closeTime.slice(0,5)} hrs.</div>
      <a href="#" class="card_room_management_room_link" onClick={() => {setOpenModal3(true);}}>See more {">"}</a>
      {openModal3 && <DisableRoom closeModal={setOpenModal3} roomId = {roomId} />} 
    </div>
    </div>
  )
}

export default Card;
