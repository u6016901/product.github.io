import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ContactSupportOutlined } from "@material-ui/icons";

const intialState = () => ({
  extendDetails: true,
  extendPictures: false
});

const green = "#39D1B4";
const yellow = "#FFD712";

function DisableRoomCell({data, roomId, date, refreshComponent}) {
    
    // console.log("each cell", data, roomId, date)
    // console.log(data.bookingId)
  
    const [toggle, setToggle] = useState(intialState);
    const access_token = sessionStorage.getItem("token")
    
    let memberId = window.sessionStorage.getItem("memberId")

    useEffect(() => {
      if (data.bookingId !== 0) {
        setToggle({ extendDetails : false, extendPictures : false });
      }
      else {
        setToggle({ extendDetails : true, extendPictures : false });
      }
      // console.log(data.bookingId, data.startTime.slice(0,5), data.endTime.slice(0,5))
      // console.log(toggle)
      // const toggles = toggle
      // console.log(toggles)
    },[toggle]);
    

    const handleToggle = e => {
      const { name } = e.target;
      setToggle({ ...toggle, [name]: !toggle[name] });

      console.log(toggle.extendDetails) // ! IF (true) {send create booking API} | ELSE {Revoke the booking}
      if (toggle.extendDetails) {
        const allMont = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        date = date.toString()
        if (date !== null ) {

          let name = window.sessionStorage.getItem("name").split(" ")
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

          let startTimeMinusSevenHours = parseInt(data.startTime.slice(0,2)) - 7
          if (startTimeMinusSevenHours < 10) { startTimeMinusSevenHours = "0" + startTimeMinusSevenHours.toString() + data.startTime.slice(2).toString() }
          else { startTimeMinusSevenHours = startTimeMinusSevenHours.toString() + data.startTime.slice(2).toString() }

          let endTimeMinusSevenHours = parseInt(data.endTime.toString().slice(0,2)) - 7
          if (endTimeMinusSevenHours < 10) { endTimeMinusSevenHours = "0" + endTimeMinusSevenHours.toString() + data.endTime.slice(2).toString() }
          else { endTimeMinusSevenHours = endTimeMinusSevenHours.toString() + data.endTime.slice(2).toString() }

          // console.log(data.endTime)
          // console.log(endTimeMinusSevenHours)
          // console.log(data.endTime.slice(2).toString())

          let startDateTimePostAPI = dateYear + "-" + dateMonth + "-" + dateDay + "T" + startTimeMinusSevenHours
          let endDateTimePostAPI =  dateYear + "-" + dateMonth + "-" + dateDay + "T" + endTimeMinusSevenHours

          console.log(roomId)
          console.log(startDateTimePostAPI)
          console.log(endDateTimePostAPI)
          console.log(name[0])
          console.log(name[1])
          console.log(memberId)

          axios({
              url: "https://arr-dev.azurewebsites.net/api/v1/mobiles/book",
              headers: {
                  'Authorization': "Bearer " + access_token
                  },
              method: "POST",
              data: {
                  Title : "Disable",
                  RoomId : roomId,
                  ActivityId : 10,
                  ChannelName : "Website - Disable",
                  StartDateTime : startDateTimePostAPI,
                  EndDateTime : endDateTimePostAPI,
                  StaffFirstName : name[0],
                  StaffLastName : name[1],
                  Member : [memberId]
          }
          })
          .then((res) => {
              console.log("okay", res.data)
              alert("Your disable is successful")
              refreshComponent()
              // history.push(path)
          })
          .catch((err) => {
              console.log(err.response.data)
              alert(err.response.data.message)
          });
        }
      }
      else {
        console.log(data.bookingId)
        console.log(memberId)

        axios({
          url: `https://arr-dev.azurewebsites.net/api/v1/webs/bookings/${data.bookingId}/cancel/${memberId}`,
          headers: {
              'Authorization': "Bearer " + access_token
              },
          method: "GET",
        })
        .then((res) => {
          console.log("okay", res.data)
          alert("Your available is successful")
          refreshComponent()
          // history.push(path)
        })
        .catch((err) => {
          console.log(err.response.data)
          alert(err.response.data.message)
        });
      }
    }

    return (
        <div>
          <button name="extendDetails" class="disable-btn" onClick={handleToggle}>
            {toggle.extendDetails ? "Available" : "Disable"} 
          </button>
          <div class="disable-cell">
              {data.startTime.slice(0,5)} - {data.endTime.slice(0,5)} hrs.
          </div>
          <hr class="hr-disable"/>
        </div>
    )
}

export default DisableRoomCell;