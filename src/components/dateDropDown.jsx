import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

  
const DateDropDown = (oldValue) => {

  const onChange = (e) => {
    window.sessionStorage.setItem("date", e)
    defaultValue = ""
  }

  const allMonts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let monts = ""

      
  let count = 1

  let defaultValue = "dd/mm/yyyy"
  console.log(oldValue.oldValue)
  if (oldValue.oldValue !== null && oldValue.oldValue !== "dd/mm/yyyy") {  
    allMonts.map( (e) => {
      if (e === oldValue.oldValue.toString().slice(4,7)) {
        if (count < 10) {
          monts = "0" + count.toString()
        }
        else { monts = count.toString()}
      }
      count += 1
    })
    let date = (monts + "/" + oldValue.oldValue.toString().slice(8,10) + "/" + oldValue.oldValue.toString().slice(11,15))

    if (oldValue !== null) {
      defaultValue = `${date}`
    }
  }

  return (
    <DatePicker
      disabledKeyboardNavigation
      dateFormat="dd/MM/yyyy" 
      placeholderText={defaultValue}
      onChange={onChange}
    />
  );
};
  

export default DateDropDown;