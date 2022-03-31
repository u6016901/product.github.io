import React, { useState } from 'react'
import axios from 'axios'
import SearchSelectBuilding from "../../../components/searchSelectBuilding"
import SearchSelectFloor from "../../../components/searchSelectFloor"
import MinDurationSelect from '../../../components/minDurationSelect'
import MaxDurationSelect from '../../../components/maxDurationSelect'
import StartTimeSelect from '../../../components/startTimeSelect'
import EndTimeSelect from '../../../components/endTimeSelect'
import { useHistory } from 'react-router-dom'


function CreateRoom({listNotComplete, onClick}) {

    const [roomTitle, setRoomTitle] = useState('')
    const [roomCapacity, setCapacity] = useState('')
    const [requireMember, setRequireMember] = useState('')
    const [baseImage, setBaseImage] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [minDuration, setMinDuration] = useState("")
    const [maxDuration, setMaxDuration] = useState("")
    const [isComplete, setIsComplete] = useState(true)
    const access_token = sessionStorage.getItem("token")
    
    let history = useHistory()
    // let listNotComplete = []
    // console.log(listNotComplete)
    let list = null

    if (listNotComplete) {
        list = listNotComplete.map(( e ) =>
            <li>{e}</li>
            // { console.log( e)}
            
        );
    }

    return (
        <div>
            <div className="createRoom-modal ">
                <div className="createRoom-modalContainer-notComplete">
                    <div className="title">Plese fill the following thing(s).</div>
                    <ul>{list}</ul>
                    <button className="btn btn-danger btn-sm" type="button" onClick={onClick}>Close</button>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateRoom