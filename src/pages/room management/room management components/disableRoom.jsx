import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import DefaultDateDropDown from '../../../components/defaultDateDropDown';
import DisableRoomCell from "./disableRoomCell";
import DisableDateDropDown from "./disableDateDropDown";

function DisableRoom({closeModal,roomId}) {
    let history = useHistory();

    const [dataRoom,setDataRoom] = useState({})
    const [dataReservation,setDataReservation] = useState(null)
    const [date, setDate] = useState(new Date());

    const access_token = sessionStorage.getItem("token")

    const postdata = async () => {
        try {
          console.log("room id",roomId)
         const roomInfo = await axios({
            url: `https://arr-dev.azurewebsites.net/api/v1/webs/room-infos/${roomId}`,
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
         });
        } catch (err) {
            console.log(err);
        }
    };

    const postdata1 = async (dateChange) => {
        try {
            let dateUse = date
            if (dateChange !== null) {dateUse = dateChange}
            // console.log(dateUse)
            const dateNow = dateUse
            const dateDay = dateNow.getDate()
            const dateMonth = dateNow.getMonth() + 1
            const dateYear = dateNow.getFullYear()
            const dateNowForAPI = dateYear + "-" + dateMonth + "-" + dateDay
            // console.log(dateNowForAPI)
            const roomInfo = await axios({
                url: ` https://arr-dev.azurewebsites.net/api/v1/webs/reserved-timeslots/${roomId}?date=${dateNowForAPI}`,
                headers: {
                    'Authorization': 'Bearer ' + access_token
                    },
                method: "GET"
            })
            .then((res) => {
                setDataReservation(res.data.data)
                console.log(res.data.data)
            });
            } catch (err) {
                console.log(err);
            }
    };
    let options = []
    
    if (dataReservation !== null ) {    
        let reservedSlot = []
        let reservedSlotBookingId = []
        let reservedSlotStatusId = []
        
        for (var i = 0; i < dataReservation.reservedSlot.length; i += 1) {
            // console.log(dataReservation.reservedSlot[i])
            let startTimeForLoopReserved = parseFloat(dataReservation.reservedSlot[i].startDateTime.slice(11, 13))
            if (dataReservation.reservedSlot[i].startDateTime.slice(14,16) === "30") { startTimeForLoopReserved += 0.5}
            let endTimeForLoopReserved = parseFloat(dataReservation.reservedSlot[i].endDateTime.slice(11, 13))
            if (dataReservation.reservedSlot[i].endDateTime.slice(14,16) === "30") { endTimeForLoopReserved += 0.5}
    
            for (var j = startTimeForLoopReserved; j <= endTimeForLoopReserved; j += 0.5) {
                if (j.toString() === endTimeForLoopReserved.toString()) { continue }
                reservedSlot.push(j.toString())
                reservedSlotBookingId.push(dataReservation.reservedSlot[i].bookingId)
                reservedSlotStatusId.push(dataReservation.reservedSlot[i].statusId)
            }
        }
        console.log(reservedSlot)
        // console.log(reservedSlotBookingId)
        // console.log(reservedSlotStatusId)
    
        let startTimeForLoop = parseFloat(dataReservation.openTime.slice(11, 13))
        if (dataReservation.openTime.slice(14,16) === "30") { startTimeForLoop += 0.5}
        let endTimeForLoop = parseFloat(dataReservation.closedTime.slice(11, 13))
        if (dataReservation.closedTime.slice(14,16) === "30") { endTimeForLoop += 0.5}
    
        let count = 0
        for (var i = startTimeForLoop; i <= endTimeForLoop -0.5; i += 0.5) {
            let startValue = ""
            let endValue = ""
            let bookingIdFromAPI = 0
            // console.log(i.toString())
            
            if (reservedSlot.includes(i.toString())) {
                
                if (reservedSlotStatusId[count] !== 6) {
                    // console.log(1, i.toString())
                    count++
                    continue 
                }
                else {
                    // console.log(2, i.toString())
                    bookingIdFromAPI = reservedSlotBookingId[count]
                    count++
                }
            }
            if (i / parseInt(i) !== 1) {
                if (i < 10) {
                    startValue = "0" + parseInt(i) + ":30:00"
                    if (parseInt(i) + 1 < 10) {
                        endValue = "0" + (parseInt(i) + 1) + ":00:00"
                    }
                    else {
                        endValue = (parseInt(i) + 1) + ":00:00"
                    }
                }
                else {
                    startValue = parseInt(i) + ":30:00"
                    endValue = (parseInt(i) + 1) + ":00:00"
                }
            }
            else {
                // console.log(i)
                if (i < 10) {
                    startValue = "0" + parseInt(i) + ":00:00"
                    if (parseInt(i) + 1 < 10) {
                        endValue = "0" + (parseInt(i)) + ":30:00"
                    }
                    else {
                        endValue = "0" + (parseInt(i)) + ":30:00"
                    }
                }
                else {
                    startValue = parseInt(i) + ":00:00"
                    endValue = (parseInt(i)) + ":30:00"
                }
            }
            // console.log(startValue, endValue)
            
            
            let optionValue = { startTime: startValue.toString(), endTime: endValue.toString(), bookingId: bookingIdFromAPI }
            // console.log(new Date().toString().slice(16, 24) < optionValue.startTime)
            // console.log(new Date().toString().slice(8, 10) <= date.toString().slice(8, 10))
            // console.log(date.toString())
            if (new Date().toString().slice(8, 10) === date.toString().slice(8, 10)){ 
                if (new Date().toString().slice(16, 24) < optionValue.startTime ) {
                    options.push(optionValue) 
                }
            }
            else  if (new Date().toString().slice(8, 10) < date.toString().slice(8, 10)) {
                options.push(optionValue) 
            }
            
            
        }
    }
    console.table(options)

    let result = []
    for (var i = 0; i < options.length; i ++) {
        let resultList = { startTime: options[i].startTime, endTime:options[i].endTime, bookingId: options[i].bookingId }
        result.push(resultList)
    }

    useEffect(() => {
        postdata()
        postdata1(null)
    },[]);

    let listCell = null

    if (result) {
        listCell = result.map((cell) => 
            <DisableRoomCell data={cell} roomId={roomId} date={date} refreshComponent={refreshComponent} />
        );
    }

    function onChangeDateDroupDown(value){
        // console.log(value)
        setDate(value)
        postdata1(value)
    }

    function refreshComponent() {
        postdata1(null)
    }
    

    return(
        <div>
            <div className="disable-model">
                <div className="disable-modelContainer">
                    <button className="disable-modelContainer-button" type="button" onClick={() => closeModal(false)} >X</button>
                    <div className="title AllBig">{dataRoom.roomName}</div> 
                    <i class='iconAddress bx bxs-school'></i>
                    <div class="address ">{dataRoom.roomName} @ {dataRoom.building} {dataRoom.floor} floor</div>
                    <h1 class="disable_search_container_date"> Date </h1>
                    <div class="date-drop-down disable ">
                        <DisableDateDropDown onChange={onChangeDateDroupDown} oldValue={date} />
                    </div>
                    <div className="body disable-border-cell disable-row canScroll">
                        <div class="col" >
                        {listCell}
                        </div>
                    </div>
                    <div className="footer">
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DisableRoom;