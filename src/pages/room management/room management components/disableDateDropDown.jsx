import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

  
const DisableDateDropDown = ({onChange, oldValue}) => {
  // console.log(oldValue)
  // let [date, setDate] = useState(oldValue);

  // function onChange(e) {
  //   setDate(e)
  //   window.sessionStorage.setItem("disableDate", e)
  // }
  // console.log(date)
  return (
    <DatePicker
      selected={oldValue}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
    />
  );
};

export default DisableDateDropDown;