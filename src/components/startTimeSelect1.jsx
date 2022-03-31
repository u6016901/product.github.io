import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';

const customStylesBuilding = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Bariol Regular',
    boxShadow: 0,
    // left: "21.55rem",
    top: "0rem",
    cursor: 'text',
    borderRadius: 5,
    fontSize: "0.8rem",
    width: "14.3rem",
    borderColor: "#EAEAEA"
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      // backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(255, 80, 86)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Bariol Regular',
  }),

  menu: styles => ({
    ...styles,
    // left: "22.5rem",
    top: "1.4rem",
    boxShadow: 'none',
    borderRadius: 5,
    fontSize: "0.8rem",
    width: "14.4rem",
    borderColor: "#EAEAEA"
    
  }),

  menuList: styles => ({
    ...styles,
    height: "9rem",
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
    fontSize: "0.8rem"
  })
}

function StartTimeSelect({roomId, onChange, oldValue}) {

  const access_token = sessionStorage.getItem("token")
  const [dataReservation,setDataReservation] = useState(null)

  // console.log(roomId.roomId)

  const dateNow = new Date()
  const dateDay = dateNow.getDate()
  const dateMonth = dateNow.getMonth() + 1
  const dateYear = dateNow.getFullYear()
  const dateNowForAPI = dateYear + "-" + dateMonth + "-" + dateDay
  // console.log(dateNow)
  // console.log(dateDay)
  // console.log(dateMonth)
  // console.log(dateYear)
  // console.log(dateNowForAPI)
  // console.log(roomId.roomId)

 const postdata = async () => {
  try {
   const roomInfo = await axios({
      url: `https://arr-dev.azurewebsites.net/api/v1/mobiles/reserved-timeslots/${roomId}?date=${dateNowForAPI}`,
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
useEffect(() => {
  postdata()
},[]);
  let options = []

  if (dataReservation !== null ) {

    let reservedSlot = []
    
    for (var i = 0; i < dataReservation.reservedSlot.length; i += 1) {

      let startTimeForLoopReserved = parseFloat(dataReservation.reservedSlot[i].startDateTime.slice(11, 13))
      if (dataReservation.openTime.slice(14,16) === "30") { startTimeForLoopReserved += 0.5}
      let endTimeForLoopReserved = parseFloat(dataReservation.reservedSlot[i].endDateTime.slice(11, 13))
      if (dataReservation.closedTime.slice(14,16) === "30") { endTimeForLoopReserved += 0.5}

      for (var j = startTimeForLoopReserved; j <= endTimeForLoopReserved; j += 0.5) {
        if (j.toString() === endTimeForLoopReserved.toString()) { continue }
        reservedSlot.push(j.toString())
      }
    }

    let startTimeForLoop = parseFloat(dataReservation.openTime.slice(11, 13))
    if (dataReservation.openTime.slice(14,16) === "30") { startTimeForLoop += 0.5}
    let endTimeForLoop = parseFloat(dataReservation.closedTime.slice(11, 13))
    if (dataReservation.closedTime.slice(14,16) === "30") { endTimeForLoop += 0.5}

    for (var i = startTimeForLoop; i <= endTimeForLoop; i += 0.5) {
      let value = ""
      
      if (reservedSlot.includes(i.toString())) { continue }
      if (i / parseInt(i) !== 1) {
        if (i < 10) {
          value = "0" + parseInt(i) + ":30:00"
        }
        else {
          value = parseInt(i) + ":30:00"
        }
      }
      else {
        if (i < 10) {
          value = "0" + parseInt(i) + ":00:00"
        }
        else {
          value = parseInt(i) + ":00:00"
        }
      }
      let optionValue = { value: value.toString(), label: value.slice(0,5).toString() }
      options.push(optionValue)
    }
  }

  let defaultValue = "Not Specified"
  if (oldValue !== null) {defaultValue = oldValue}

  return (
    <Select
      options={options}
      placeholder={defaultValue}
      styles={customStylesBuilding}
      onChange={onChange}
    />
  );
}

export default StartTimeSelect ;

