import React, { useEffect, useState } from "react";
import axios from 'axios';
import StartTimeSelect2 from './startTimeSelect2';
import EndTimeSelect1 from './endTimeSelect1';
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Purpose from './purpose';

function NewReservation({closeModal,roomId}) {
    let history = useHistory();
  
    const [meetingTitle, setMeetingTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [purpose, setPurpose] = useState('');

    const [dataRoom,setDataRoom] = useState({})
    const [address,setAddress] = useState("")
    // const [baseImage, setBaseImage] = useState("");
    const access_token = sessionStorage.getItem("token")
    let date1 = sessionStorage.getItem("date")
    if (date1 === null) { date1 = new Date()}

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
            // console.log("data",res.data.data.floor); 
            setDataRoom(res.data.data)
         });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        postdata()
    },[]);

    function onChangeInputStartTime(value){
        setStartTime(value)
    }
      
    function onChangeInputEndTime(value){
        setEndTime(value)
    }
    
    function onChangeInputPurpose(value){
        setPurpose(value)
    }
    // const dateNow = new Date()
    // const dateDay = dateNow.getDate()
    // const dateMonth = dateNow.getMonth() + 1
    // const dateYear = dateNow.getFullYear()
    // const dateNowForAPI = dateYear + "-" + dateMonth + "-" + dateDay
    
    const onClick = (event) => {
        
        const allMont = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = date1.toString()
        if (date !== null && meetingTitle !== "" && purpose.value !== "undefined"  && startTime !== "undefined" && endTime !== "undefined"){
            let dateDay = date.slice(8, 10)
            let dateMonth = ""
            let dateYear = date.slice(11, 15)

            for (var i = 0; i <= allMont.length; i++) {
                if (allMont[i] === date.slice(4, 7).toString()) {
                    if (i < 10) {
                        dateMonth = "0" + (i + 1).toString()
                    }
                    else {
                        dateMonth = (i + 1).toString()
                    }
                }
            }
        
        

            let meetingTitlePostAPI = meetingTitle
            let purposePostAPI = purpose.value
            let name = window.sessionStorage.getItem("name").split(" ")
            let memberId = window.sessionStorage.getItem("memberId")

            let startTimeMinusSevenHours = parseInt(startTime.value.slice(0,2)) - 7
            if (startTimeMinusSevenHours < 10) { startTimeMinusSevenHours = "0" + startTimeMinusSevenHours.toString() + startTime.value.slice(2).toString() }
            else { startTimeMinusSevenHours = startTimeMinusSevenHours.toString() + startTime.value.slice(2).toString() }

            // console.log(endTime.value.toString())
            // console.log(endTime.value.toString().slice(0,2))
            let endTimeMinusSevenHours = parseInt(endTime.value.toString().slice(0,2)) - 7
            // console.log(endTimeMinusSevenHours)
            if (endTimeMinusSevenHours < 10) { endTimeMinusSevenHours = "0" + endTimeMinusSevenHours.toString() + endTime.value.slice(2).toString() }
            else { endTimeMinusSevenHours = endTimeMinusSevenHours.toString() + endTime.value.slice(2).toString() }

            let startDateTimePostAPI = dateYear + "-" + dateMonth + "-" + dateDay + "T" + startTimeMinusSevenHours
            // console.log(dateMonth)
            let endDateTimePostAPI =  dateYear + "-" + dateMonth + "-" + dateDay + "T" + endTimeMinusSevenHours

            // console.log(meetingTitlePostAPI)
            // console.log(roomId)
            // console.log(purposePostAPI)
            // console.log(startDateTimePostAPI)
            // console.log(endDateTimePostAPI)
            // console.log(name[0])
            // console.log(name[1])
            // console.log(memberId)

            event.preventDefault();

            axios({
                url: "https://arr-dev.azurewebsites.net/api/v1/mobiles/book",
                headers: {
                    'Authorization': "Bearer " + access_token
                    },
                method: "POST",
                data: {
                    Title : meetingTitlePostAPI,
                    RoomId : roomId,
                    ActivityId : purposePostAPI,
                    ChannelName : "Website - Reservation",
                    StartDateTime : startDateTimePostAPI,
                    EndDateTime : endDateTimePostAPI,
                    StaffFirstName : name[0],
                    StaffLastName : name[1],
                    Member : [memberId]
            }
            })
            .then((res) => {
                console.log("okay", res.data)
                alert("Your reservation has been created")
                let path = `/reservationManagement`
                history.push(path)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err.response.data)
                alert(err.response.data.message)
            });
        }
        else {
            alert("Please fill everything")
        }
    }

    return(
        <div>
            <div className="newReservation-modal ">
                <div className="newReservation-modalContainer">
                    <div className="title AllBig">new reservation</div> 
                    <i class='iconAddress bx bxs-school'></i>
                        <div class="address ">{dataRoom.roomName} @ {dataRoom.building} {dataRoom.floor} floor</div>
                        <i class='iconCalendar bx bx-calendar'></i>
                        <div class="calendar">{new Date(date1).toLocaleDateString("en-GB")}</div>
                    <div className="body">
                        <form className="col-12">
                            <label className="col-6 firstFormForNewReservation">Meeting Title</label>
                            <label className="col-6 secondFormForNewReservation">Purpose</label>
                            <textarea className="size1 firstP" onChange={event => setMeetingTitle(event.target.value)} placeholder="Meeting Title" required></textarea>
                            <Purpose onChange={onChangeInputPurpose} className="firstPP" required oldValue={null} />
                            <label className="col-6 firstForm1">Start Time</label>
                            <label className="col-6 secondForm1">End Time</label>
                            <StartTimeSelect2 roomId={roomId} onChange={onChangeInputStartTime} className="size zero" required oldValue={null} />
                            <EndTimeSelect1 startTime={startTime} roomId={roomId} onChange={onChangeInputEndTime} className="size secondP" required oldValue={null} />
                        </form>
                    </div>
                    <div className="footer">
                        <button className="btn btn-danger btn-sm" onClick={onClick}  type="button">New</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                </div>
                
            </div>
        </div>
    )

}

export default NewReservation;