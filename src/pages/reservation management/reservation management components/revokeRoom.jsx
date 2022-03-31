import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import DefaultDateDropDown from '../../../components/defaultDateDropDown';
import RevokeRoomCell from "./revokeRoomCell";

function RevokeRoom({closeModal,roomId}) {
    let history = useHistory();

    const [dataRoom, setDataRoom] = useState({})
    const [dataReservation, setDataReservation] = useState(null)
    const [checkedBooking, setcheCkedBooking] = useState([])
    const [selectChecked, setSelectChecked] = useState(false)
    const [reason, setReason] = useState("")
    let date1 = sessionStorage.getItem("date")
    if (date1 === null) {
        date1 = new Date()
    }

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
                console.log("data",res.data.data); 
                setDataRoom(res.data.data)
            });
        } catch (err) {
            console.log(err);
        }
    };

    const postdata1 = async () => {
        try {
            console.log(date1)
            console.log("room id",roomId)

            const allMont = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            let date = date1.toString()
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
            let dateTimePostAPI = dateMonth + "/" + dateDay + "/" + dateYear
            console.log(dateTimePostAPI)

            const roomInfo = await axios({
                url: `https://arr-dev.azurewebsites.net/api/v1/webs/bookings/reserved-timeslots-for-revoke`,

                headers: {
                    'Authorization': 'Bearer ' + access_token
                    },
                method: "Post",
                data: {
                    roomId : roomId,
                    Date : dateTimePostAPI
                }
            })
            .then((res) => {
                console.log("data",res.data.data); 
                setDataReservation(res.data.data)
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        postdata()
        postdata1()
    },[]);

    

    function onChangeReason(value){
        // console.log(value.target.value)
        setReason(value.target.value)
    }

    function onClickRevoke(value){

        const memberId = sessionStorage.getItem("memberId")      

        for (var i = 0; i < checkedBooking.length; i++) {
            console.log(memberId)
            console.log(checkedBooking[i])
            console.log(reason)
            try {
                const roomInfo = axios({
                    url: `https://arr-dev.azurewebsites.net/api/v1/webs/bookings/revoke`,
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                        },
                    method: "Post",
                    data: {
                        memberId : memberId,
                        BookingId : checkedBooking[i],
                        Reason : reason
                    }
                })
                .then((res) => {
                    alert("Your revoke is successful")
                    let path = `/reservationManagement`
                    history.push(path)
                    window.location.reload()
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    function onClickSelectAll(value) {
        setSelectChecked(!selectChecked)
    }

    function onClickCheckedBooking(value, checked) {
        console.log(value, checked)
        let list = checkedBooking
        console.log(list)
        if (checked) {
            list.push(value)
        }
        else {
            let newlist = []
            for (var i = 0; i < list.length; i++) {
                if (list[i] === value) {
                    console.log("delete")
                    continue
                } else { newlist.push(list[i]) }
            }
            console.log(newlist)
            list = newlist
        }
        console.log(list)
        setcheCkedBooking(list)
    }

    let listCell = null

    if (dataReservation !== null) {
        listCell = dataReservation.map((cell) => 
            <RevokeRoomCell data={cell} selectAll={selectChecked} onClickCheckedBooking={onClickCheckedBooking} />
        );
    }
    

    return(
        <div>
            <div className="disable-model">
                <div className="disable-modelContainer">
                    <button className="disable-modelContainer-button" type="button" onClick={() => closeModal(false)} >X</button>
                    <div className="title AllBig">{dataRoom.roomName}</div> 
                    <i class='iconAddress bx bxs-school'></i>
                    <div class="address ">{dataRoom.roomName} @ {dataRoom.building} {dataRoom.floor} floor</div>
                    <i class='iconCalendar bx bx-calendar'></i>
                    <div class="calendar">{new Date(date1).toLocaleDateString("en-GB")}</div>
                    <div className="body revoke-border-cell disable-row canScroll">
                        <div class="col">
                            {listCell}
                        </div>
                    </div>
                    <h5>Reason</h5>
                    <textarea class="revoke-reason" onChange={onChangeReason} placeholder="   Reason"></textarea>
                    <div className="footer revoke-footer">
                        <button className="revoke-btn btn btn-danger btn-sm" onClick={onClickRevoke} type="button">Confirm</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RevokeRoom;