import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchSelectBuilding from "../../../components/searchSelectBuilding";
import SearchSelectFloor from "../../../components/searchSelectFloor";
import MinDurationSelect from '../../../components/minDurationSelect';
import MaxDurationSelect from '../../../components/maxDurationSelect';
import StartTimeSelect from '../../../components/startTimeSelect';
import EndTimeSelect from '../../../components/endTimeSelect';
import { useHistory } from 'react-router-dom';

function ModifyRoom( { closeModal,roomId } ) {
    const [data, setData] = useState(false);
    const [baseImage, setBaseImage] = useState("");
    const access_token = sessionStorage.getItem("token")

    const [roomTitle, setRoomTitle] = useState("");
    const [cap, setCap] = useState("");
    const [minAt, setMinAt] = useState("");
    const [minDuration, setMinDuration] = useState("");
    const [maxDuration, setMaxDuration] = useState("");
    const [oldImg,setOldImg] = useState([]);
    const [startTime,setStartTime] = useState("")
    const [endTime,setEndTime] = useState("")
    const [building,setBuilding] = useState("")
    const [floor,setFloor] = useState("")
 
    let history = useHistory();

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
          setBuilding(res.data.data.building) 
          setFloor(res.data.data.floor) 
          setRoomTitle(res.data.data.roomName)
          setStartTime(res.data.data.startTime.slice(0,5)) 
          setEndTime(res.data.data.endTime.slice(0,5)) 
          setCap(res.data.data.capacity)
          setMinAt(res.data.data.minAttendees)
          setMinDuration(res.data.data.minDuaration) 
          setMaxDuration(res.data.data.maxDuration) 
          setOldImg(res.data.data.roomPictureUrl)
       });
      } catch (err) {
          console.log(err);
      }
   };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function onChangeInputStartTime(value){
    setStartTime(value.value)
  }

  function onChangeInputEndTime(value){
    setEndTime(value.value)
  }

  function onChangeInputMinDuration(value){
    setMinDuration(value.value)
  }

  function onChangeInputMaxDuration(value){
    setMaxDuration(value.value)
  }
  function onChangeInputBuilding(value) {
    setBuilding(value.value.toString())
  }
  function onChangeInputFloor(value) {
    setFloor(value.value.toString())
  }

  const onClick = async (event) => {
    event.preventDefault();

    let picUrl = baseImage
    if (baseImage.length == 0 ) {
      picUrl = oldImg
    }

    let building1 = building
    if (building1 === null || building1 === "Not Specified")
      building1 = building
    
    let floor1 = floor
    if (floor1 === null || floor1 === "Not Specified")
      floor1 = floor
    
    let minDurationPostAPI = minDuration
    // if (minDurationPostAPI === null)
    //   minDurationPostAPI = minDu
    
    let maxDurationPostAPI = maxDuration
    // if (maxDurationPostAPI === null)
    //   maxDurationPostAPI = maxD
    let startTimePostAPI = startTime + ":00"
    // if (startTimePostAPI === null)
    //   startTimePostAPI = dataStartTime
    
    let endTimePostAPI = endTime + ":00"
    // if (endTimePostAPI === null)
    //   endTimePostAPI = dataEndTime

    console.log(roomId)
    console.log(roomTitle)
    console.log(building1)
    console.log(floor1)
    console.log(cap)
    console.log(picUrl)
    console.log(minAt) 
    console.log(minDurationPostAPI)
    console.log(maxDurationPostAPI)
    console.log(startTimePostAPI)
    console.log(endTimePostAPI)

    try {
     await axios({
        url: "https://arr-dev.azurewebsites.net/api/v1/webs/rooms-modify",
        headers: {
            'Authorization': 'Bearer ' + access_token
            },
        method: "POST",
        data: {
            RoomId: roomId,
            RoomName: roomTitle,
            Building: building1,
            Floor: floor1,
            RoomCapacity: cap,
            RoomPictureUrl: picUrl,
            MinAttendee: minAt,
            MinDuration: minDurationPostAPI,
            MaxDuration: maxDurationPostAPI,
            CloseTime: endTimePostAPI,
            OpenTime: startTimePostAPI
        }
    })
    .then((res) => {
      alert("Your room has been modified")
      history.push("/roomManagement")
      window.location.reload("/roomManagement");
     });
    } catch (err) {
      console.log(err.response.data.message)
      alert(err.response.data.message)
      setData(true)
    }
 };

  useEffect(() => {
    postdata();
  },[]);

    return(
        <div>
            <div className="createRoom-modal ">
                <div className="createRoom-modalContainer">
                    <div className="title">MODIFY ROOM</div>
                    <div className="body">
                        <form className="new-col-12">
                            <label className="col-6 firstForm">Building</label>
                            <label className="col-6 secondForm">Floor</label>
                            <SearchSelectBuilding onChange={onChangeInputBuilding} className="size zero" oldValue={building}/>
                            <SearchSelectFloor onChange={onChangeInputFloor} className="size secondP" oldValue={floor}/>
                            
                            <label className="col-6 firstForm">Room Title</label>
                            <label className="col-6 secondForm">Room Capacity</label>
                            <textarea className="size" placeholder={roomTitle} onChange={event => setRoomTitle(event.target.value)} required></textarea>
                            <textarea className="size  secondP" placeholder={cap} onChange={event => setCap(event.target.value)} required></textarea>


                            <div className='rowWWWW'>
                            <label className="col-6 firstForm">Require Member</label>
                            <label className="col-6 secondForm">Room Image</label>
                            <textarea className="size" placeholder={minAt} onChange={event => setMinAt(event.target.value)} required></textarea>
                            
                            <input type="file" className="col-6 size form-control thirdP" id="customFile" onChange={(e) => {uploadImage(e);}}></input>
                            </div>
                            
                            <label className="col-6 firstForm">Min Duration</label>
                            <label className="col-6 secondForm">Max Duration</label>
                            <MinDurationSelect onChange={onChangeInputMinDuration} className="size zero" oldValue={minDuration}/>
                            <MaxDurationSelect onChange={onChangeInputMaxDuration} minDuration={minDuration} className="size secondP" oldValue={maxDuration}/>

                            <label className="col-6 firstForm">Start Time</label>
                            <label className="col-6 secondForm">End Time</label>
                            <StartTimeSelect onChange={onChangeInputStartTime} className="size zero" oldValue={startTime}/>
                            <EndTimeSelect onChange={onChangeInputEndTime} className="size secondP" oldValue={endTime} startTime={startTime}  minDuration={minDuration}/>
                        </form>
                    </div>

                    <div className="footer">
                        <button className="btn btn-danger btn-sm" onClick={onClick} type="button">Save</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModifyRoom;