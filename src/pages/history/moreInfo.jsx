import '../../App.css';
import cardImg from '../../assets/cardImg.png';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router'



function MoreInfo() {

  let history = useHistory();

  const [dataRoom,setDataRoom] = useState({})
  const [dataStartTime,setDataStartTime] = useState('')
  const [dataEndTime,setDataEndTime] = useState('')

  const [dataReservation,setDataReservation] = useState({})
  
  const [dataStatus,setDataStatus] = useState('')
  const [dataReason,setDataReason] = useState('')

  const [dataStudents, setDataStudents] = useState([])

  const [dataMinDu,setDataMinDu] = useState('')
  const [dataMaxDu,setDataMaxDu] = useState('')

  const [newImg,SetNewImg] = useState('')
  
  const access_token = sessionStorage.getItem("token")

  if(!access_token){
    history.push("/")
    window.location.reload("/");
  }
  
  const location = useLocation();
  const BookingId = location.state.booking_id
  const RoomId = location.state.room_id
  console.log("39", BookingId)
  console.log("40", RoomId)

  const postdata = async () => {
      try {

       const res = await axios({
   
          url: `https://arr-dev.azurewebsites.net/api/v1/webs/booking-infos/${BookingId}`,
          headers: {
              'Authorization': 'Bearer ' + access_token
              },
          method: "GET",
          data: {
          }
      })
      .then((res) => {
          console.log(res.data.data);
          setDataReservation(res.data.data)
          setDataStudents(res.data.data.student)

          setDataStatus(res.data.data.status.split(" ")[0])
          
          if (res.data.data.status.split(" ")[0] == "Failed") {
            setDataReason(res.data.data.status.slice(9,-1))
          } else {
            setDataReason("-")
          }

       });
      } catch (err) {
          console.log(err);
      }
   };

   const postdata1 = async () => {
    try {
     const roomInfo = await axios({
        url: `https://arr-dev.azurewebsites.net/api/v1/webs/room-infos/${RoomId}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
            },
        method: "GET",
        data: {
        }
    })
    .then((res) => {
        
        console.log(res.data.data)
        setDataRoom(res.data.data)
        setDataStartTime(res.data.data.startTime.slice(0,5))
        setDataEndTime(res.data.data.endTime.slice(0,5))

        if (res.data.data.minDuaration >= 60) {
          var num = res.data.data.minDuaration;
          var hours = (num / 60);
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          if (rminutes == 0) {
  
            setDataMinDu(rhours + " hrs.")
          } else {
           
            setDataMinDu(rhours + " hrs. " + rminutes + " min.") 
          }
          
        } else {
         
          setDataMinDu(res.data.data.minDuaration+ " min.")
        }

        if (res.data.data.maxDuration >= 60) {
          var num = res.data.data.maxDuration;
          var hours = (num / 60);
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          if (rminutes == 0) {
     
            setDataMaxDu(rhours + " hrs.") 
          } else {
            setDataMaxDu(rhours + " hrs. " + rminutes + " min.") 
        }
      } else {
        setDataMaxDu(res.data.data.maxDuration+ " min.")
      }
        
        
     });
    } catch (err) {
        console.log(err);
    }
 };

  useEffect(() => {
       postdata();
  },[]);

  useEffect(() => {
    postdata1();
},[]);






  return (
    <div>
      <body> 
        <div class="card">
          <img class="card-img-top" 
          src={cardImg}
          ></img>
            <div class="card-img-overlay">
              <h4 class="headContent card-title">MORE INFORMATION</h4>
              <p class="content card-text">Invitation Code: {dataReservation.invitationCode}</p>
            </div>
        </div>
        
        <div class="myCard1 card">
          <div class="card-body">
            <p class="headForCard card-text boldB">{dataRoom.roomName}</p>
            <hr style={{height: "0.03rem", color: "#D7D5DB"}}/>
            
            <img src={dataRoom.roomPictureUrl}></img>
            <p class="customPForBuilding card-text regularB">Building</p>
            <p class="customPForBuilding1 card-text regularB">Floor</p>
            <div className='customForDisable0'>
              <textarea disabled value={dataRoom.building} onChange={setDataRoom}></textarea>
            </div>
            <div className='customPosition customForDisable0'>
              <textarea disabled value={dataRoom.floor} onChange={setDataRoom}></textarea>
            </div>

            <div className='rowW'>
              <p class="customPForBuilding card-text regularB">Room Capacity</p>
              <p class="customPForBuilding1 card-text regularB">Require Member</p>
              <div className='customForDisable0'>
                <textarea disabled value={dataRoom.capacity} onChange={setDataRoom}></textarea>
              </div>
              <div className='customPosition customForDisable0'>
                <textarea disabled value={dataRoom.minAttendees} onChange={setDataRoom}></textarea>
              </div>
            </div>
            
            <div className='rowW'>
              <p class="customPForBuilding card-text regularB">Min Duration</p>
              <p class="customPForBuilding1 card-text regularB">Max Duration</p>
              <div className='customForDisable0'>
                <textarea disabled value={dataMinDu} onChange={setDataMinDu}></textarea>
              </div>
              <div className='customPosition customForDisable0'>
                <textarea disabled value={dataMaxDu} onChange={setDataMaxDu}></textarea>
              </div>
            </div>

            <div className='rowW'>
              <p class="customPForBuilding card-text regularB">Start Time</p>
              <p class="customPForBuilding1 card-text regularB">End Time</p>
              <div className='customForDisable0'>
                <textarea disabled value={dataStartTime} onChange={setDataStartTime}></textarea>
              </div>
              <div className='customPosition customForDisable0'>
                <textarea disabled value={dataEndTime} onChange={setDataEndTime}></textarea>
              </div>
            </div>

          </div>
        </div>


        <div class="myCard card">
          <div class="card-body">
            <p class="headForCard card-text boldB">{dataReservation.meetingTitle}</p>
            <hr style={{height: "0.03rem", color: "#D7D5DB"}}/>
            
            <p class="customPForBuilding card-text regularB">Date</p>
            <p class="customPForBuilding2 card-text regularB">Time</p>
            <div className='customForDisable1'>
              <textarea disabled value={new Date(dataReservation.startDateTime).toLocaleDateString("en-GB")} onChange={setDataRoom}></textarea>
            </div>
            <div className='customPosition1 customForDisable1'>
              <textarea disabled value={new Date(dataReservation.startDateTime).toLocaleTimeString(undefined, {
                hour:   '2-digit',
                minute: '2-digit',
                hour12: false
              }) + ' - ' + new Date(dataReservation.endDateTime).toLocaleTimeString(undefined, {
                hour:   '2-digit',
                minute: '2-digit',
                hour12: false
              })} onChange={setDataRoom}></textarea>
            </div>

            <div className='rowW'>
              <p class="customPForBuilding card-text regularB">Reserved At</p>
              <p class="customPForBuilding2 card-text regularB">Reserved By</p>
              <div className='customForDisable1'>
                <textarea disabled value={new Date(dataReservation.reservedAt).toLocaleString("en-GB")} onChange={setDataReservation}></textarea>
              </div>
              <div className='customPosition1 customForDisable1'>
                <textarea disabled value={dataReservation.reservedBy} onChange={setDataReservation}></textarea>
              </div>
            </div>
              
              
            <div className='rowW'>
            <p class="customPForBuilding card-text regularB">List of Require Members</p>
              <div className='customForDisable2'>
                {dataStudents.map((key)=> 
                <p>{key.firstNameEn + " " + key.lastNameEn}</p>
                )}
              </div>
            </div>


            <div className='rowW'>
              <p class="customPForBuilding card-text regularB">Purpose</p>
              <p class="customPForBuilding2 card-text regularB">Status</p>
              <div className='customForDisable1'>
                <textarea disabled value={dataReservation.purpose} onChange={setDataRoom}></textarea>
              </div>
              <div className='customPosition1 customForDisable1'>
                <textarea disabled value={dataStatus} onChange={setDataStatus}></textarea>
              </div>
            </div>

            <div className='rowW'>
              <p class="customPForBuilding card-text regularB">Reason</p>
              <div className='customForDisable3'>
                <textarea disabled value={dataReason} onChange={setDataReason}></textarea>
              </div>
            </div>

          </div>
        </div>
      </body>
    </div>
  );
}
 
export default MoreInfo;