import React, { useState } from 'react'
import axios from 'axios'
import SearchSelectBuilding from "../../../components/searchSelectBuilding"
import SearchSelectFloor from "../../../components/searchSelectFloor"
import MinDurationSelect from '../../../components/minDurationSelect'
import MaxDurationSelect from '../../../components/maxDurationSelect'
import StartTimeSelect from '../../../components/startTimeSelect'
import EndTimeSelect from '../../../components/endTimeSelect'
import NotComplete from './notComplete'
import { useHistory } from 'react-router-dom'


function CreateRoom({closeModal}) {

    const [building, setBuilding] = useState("")
    const [floor, setFloor] = useState("")
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
    let [listNotComplete, updateListNotComplete] = useState([])
    let history = useHistory()

    const onClick = (event) => {
        console.log(isComplete)

        let buildingPostAPI = building
        let floorPOSTAPI = floor
        let minDurationPostAPI = minDuration.value
        let maxDurationPostAPI = maxDuration.value
        let startTimePostAPI = startTime.value
        let endTimePostAPI = endTime.value
        let newList = listNotComplete

        event.preventDefault()

        console.log(buildingPostAPI)
        if (buildingPostAPI === "") {
            setIsComplete(false)
            if (!listNotComplete.includes("Building")) { listNotComplete.push("Building") }
            
        } else {   
            if (listNotComplete.includes("Building")) { 
                newList = newList.filter(item => item !== "Building")
            }
        }

        console.log(floorPOSTAPI)
        if (floorPOSTAPI === "") {
            setIsComplete(false)
            if (!listNotComplete.includes("Floor")) { listNotComplete.push("Floor") }
        } else { 
            if (listNotComplete.includes("Floor")) { 
                newList = newList.filter(item => item !== "Floor")
            }
        }

        console.log(roomTitle)
        if (roomTitle === "") {
            setIsComplete(false)
            if (!listNotComplete.includes("Room Title")) { listNotComplete.push("Room Title") }
        } else { 
            if (listNotComplete.includes("Room Title")) {
                newList = newList.filter(item => item !== "Room Title")
            }
        }

        console.log(roomCapacity)
        if (roomCapacity === "") {
            setIsComplete(false)
            if (!listNotComplete.includes("Room Capacity")) { listNotComplete.push("Room Capacity") }
        } else { 
            if (listNotComplete.includes("Room Capacity")) { 
                newList = newList.filter(item => item !== "Room Capacity")
            }
        }

        console.log(baseImage)
        if (baseImage === "") {
            setIsComplete(false)
            if (!listNotComplete.includes("Image")) { listNotComplete.push("Image") }
        } else { 
            if (listNotComplete.includes("Image")) { 
                newList = newList.filter(item => item !== "Image")
            }
        }

        console.log(requireMember)
        if (requireMember === "") {
            setIsComplete(false)
            if (!listNotComplete.includes("Require Member")) { listNotComplete.push("Require Member") }
        } else { 
            if (listNotComplete.includes("Require Member")) { 
                newList = newList.filter(item => item !== "Require Member")
            }
        }

        console.log(minDurationPostAPI)
        if (typeof minDurationPostAPI === "undefined") {
            setIsComplete(false)
            if (!listNotComplete.includes("Min Duration")) { listNotComplete.push("Min Duration") }
        } else { 
            if (listNotComplete.includes("Min Duration")) { 
                newList = newList.filter(item => item !== "Min Duration")
            }  
        }

        console.log(maxDurationPostAPI)
        if (typeof maxDurationPostAPI === "undefined") {
            setIsComplete(false)
            if (!listNotComplete.includes("Max Duration")) { listNotComplete.push("Max Duration") }
        } else { 
            if (listNotComplete.includes("Max Duration")) { 
                newList = newList.filter(item => item !== "Max Duration")
            }
        }

        console.log(startTimePostAPI)
        if (typeof startTimePostAPI === "undefined") {
            setIsComplete(false)
            if (!listNotComplete.includes("Start Time")) { listNotComplete.push("Start Time") }
        } else { 
            if (listNotComplete.includes("Start Time")) { 
                newList = newList.filter(item => item !== "Start Time")
            }
        }

        console.log(endTimePostAPI)
        if (typeof endTimePostAPI === "undefined") {
            setIsComplete(false)
            if (!listNotComplete.includes("End Time")) { listNotComplete.push("End Time") }
        } else {
            if (listNotComplete.includes("End Time")) { 
                newList = newList.filter(item => item !== "End Time")
            }
        }
        console.log(newList)
        updateListNotComplete(newList)
        
        let complete = isComplete
        if (listNotComplete.length === 0) { 
            console.log("changed")
            complete = true
        }

        if (complete) {
            axios({
                url: "https://arr-dev.azurewebsites.net/api/v1/webs/rooms-create",
                headers: {
                    'Authorization': "Bearer " + access_token
                    },
                method: "POST",
                data: {
                    Campus: null,
                    Building : buildingPostAPI,
                    Floor : floorPOSTAPI,
                    RoomTitle: roomTitle,
                    RoomCapacity: roomCapacity,
                    RoomPictureUrl: baseImage,
                    MinAttendee: requireMember,
                    MinDuration: minDurationPostAPI,
                    MaxDuration: maxDurationPostAPI,
                    CloseTime: endTimePostAPI,
                    OpenTime: startTimePostAPI
            }
            })
            .then((res) => {
                console.log("okay", res.data)
                alert("Your room has been created")
                let path = `/roomManagement`
                history.push(path)
                window.location.reload()
            })
        }   
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setBaseImage(base64)
        
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
        })
    }

    function onChangeInputStartTime(value) {
        setStartTime(value)
    }

    function onChangeInputEndTime(value) {
        setEndTime(value)
    }

    function onChangeInputMinDuration(value) {
        setMinDuration(value)
    }

    function onChangeInputMaxDuration(value) {
        setMaxDuration(value)
    }

    function onClickNotComplete() {
        setIsComplete(true)
    }

    function onChangeInputBuilding(value) {
        setBuilding(value.value.toString())
    }
    function onChangeInputFloor(value) {
        setFloor(value.value.toString())
    }

    return (
        <div>
            <div className="createRoom-modal">
                <div className="createRoom-modalContainer">
                    <div className="title">CREATE ROOM</div>
                    <div className="body">
                        <form className="new-col-12">
                            
                            <label className="col-6 firstForm">Building</label>
                            <label className="col-6 secondForm">Floor</label>
                            <SearchSelectBuilding onChange={onChangeInputBuilding} className="size zero" required oldValue={null} />
                            <SearchSelectFloor onChange={onChangeInputFloor} className="size secondP" required oldValue={null} />
                            
                            <label className="col-6 firstForm">Room Title</label>
                            <label className="col-6 secondForm">Room Capacity</label>
                            <textarea className="size" onChange={event => setRoomTitle(event.target.value)} required></textarea>
                            <textarea className="size  secondP" onChange={event => setCapacity(event.target.value)} required></textarea>

                            <div className='rowWWWW'>
                            <label className="col-6 firstForm">Require Member</label>
                            <label className="col-6 secondForm">Room Image</label>
                            <textarea className="size" onChange={event => setRequireMember(event.target.value)} required></textarea>
                            <input type="file" className="col-6 size form-control thirdP" id="customFile" onChange={(e) => {uploadImage(e)}}></input>
                            </div>
                            
                            <label className="col-6 firstForm">Min Duration</label>
                            <label className="col-6 secondForm">Max Duration</label>
                            <MinDurationSelect onChange={onChangeInputMinDuration} className="size zero" required />
                            <MaxDurationSelect minDuration={minDuration} onChange={onChangeInputMaxDuration} className="size secondP" required />

                            <label className="col-6 firstForm">Start Time</label>
                            <label className="col-6 secondForm">End Time</label>
                            <StartTimeSelect onChange={onChangeInputStartTime} className="size zero" required oldValue={null} />
                            <EndTimeSelect minDuration={minDuration} startTime={startTime} onChange={onChangeInputEndTime} className="size secondP" required oldValue={null} />
                        </form>
                    </div>

                    <div className="footer">
                        <button className="btn btn-danger btn-sm" onClick={onClick} type="button">Create</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                    {!isComplete && <NotComplete listNotComplete={listNotComplete} onClick={onClickNotComplete} />}
                </div>
            </div>
        </div>
    )
}

export default CreateRoom