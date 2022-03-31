import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';

const customStylesFloor = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Bariol Regular',
    boxShadow: 0,
    left: "15.6rem",
    paddingBottom: "0rem",
    top: "-1.61rem",
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
    left: "15.5rem",
    top: "-0.2rem",
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

function EndTimeSelect({startTime, roomId, onChange, oldValue}) {
  // console.log(startTime)

  const access_token = sessionStorage.getItem("token")
  const [dataReservation,setDataReservation] = useState(null)

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
      method: "GET",
      data: {
      }
  })
  .then((res) => {
      setDataReservation(res.data.data)
   });
  } catch (err) {
      console.log(err);
  }
};
useEffect(() => {
  postdata()
},[]);

  let options = []

  if (dataReservation !== null && startTime !== "" ) {

    let reservedSlot = []
    let firstSlot = -1
    let minDuration = dataReservation.minDuration / 60

    let startTimeForLoop = parseFloat(startTime.value.slice(0,2)) + minDuration
    if (startTime.value.slice(3,5) === "30") { startTimeForLoop += 0.5}


    let endTimeForLoop = parseFloat(dataReservation.closedTime.slice(11, 13))
    // console.log(startTime)
    // console.log(startTime.value.slice(0,2))
    // console.log(startTime.value.slice(3,5))
    if (dataReservation.closedTime.slice(14,16) === "30") { endTimeForLoop += 0.5}
    // console.log(startTimeForLoop)

    for (var i = 0; i < dataReservation.reservedSlot.length; i += 1) {

      let startTimeForLoopReserved = parseFloat(dataReservation.reservedSlot[i].startDateTime.slice(11, 13))
      if (dataReservation.openTime.slice(14,16) === "30") { startTimeForLoopReserved += 0.5}
      let endTimeForLoopReserved = parseFloat(dataReservation.reservedSlot[i].endDateTime.slice(11, 13))
      if (dataReservation.closedTime.slice(14,16) === "30") { endTimeForLoopReserved += 0.5}

      // console.log(startTimeForLoopReserved, endTimeForLoopReserved)
      for (var i = startTimeForLoopReserved; i <= endTimeForLoopReserved; i += 0.5) {
        if (i === startTimeForLoopReserved && i >= startTimeForLoop) { firstSlot = i}
        reservedSlot.push(i.toString())
      }
    }
    // reservedSlot.push("14")
    // reservedSlot.push("14.5")
    // reservedSlot.push("15")
    // console.log(reservedSlot)
    // firstSlot = 14
    // console.log(firstSlot)

    if (firstSlot === -1) {
      for (var i = startTimeForLoop; i <= endTimeForLoop; i += 0.5) {
        let value = ""
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
    else {
      for (var i = startTimeForLoop; i <= firstSlot ; i += 0.5) {
        let value = ""
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
  }

  let defaultValue = "Not Specified"
  if (oldValue !== null) {defaultValue = oldValue}

  return (
    <Select
      className="positionFloorSelect"
      options={options}
      placeholder={defaultValue}
      styles={customStylesFloor}
      onChange={onChange}
    />
  );
}

export default EndTimeSelect;

