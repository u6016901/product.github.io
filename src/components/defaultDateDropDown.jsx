import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

  
const DefaultDateDropDown = () => {
  let [date, setDate] = useState(new Date());

  function onChange(e) {
    console.log(e)
    setDate(e)
    window.sessionStorage.setItem("date", e)
  }

  return (
    <DatePicker
      selected={date}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
    />
  );
};

export default DefaultDateDropDown;