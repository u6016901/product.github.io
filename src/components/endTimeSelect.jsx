import React from 'react'
import Select from 'react-select'

const customStylesFloor = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Bariol Regular',
    boxShadow: 0,
    left: "16rem",
    paddingBottom: "0rem",
    top: "-1.61rem",
    cursor: 'text',
    borderRadius: 5,
    fontSize: "0.8rem",
    width: "14rem",
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
    left: "16rem",
    top: "-0.4rem",
    boxShadow: 'none',
    borderRadius: 5,
    fontSize: "0.8rem",
    width: "14rem",
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

function EndTimeSelect({minDuration, startTime, onChange ,oldValue}) {

  let optionsList = [{ value: "09:00", label: "09:00" },
                { value: "09:30", label: "09:30" },
                { value: "10:00", label: "10:00" },
                { value: "10:30", label: "10:30" },
                { value: "11:00", label: "11:00" },
                { value: "11:30", label: "11:30" },
                { value: "12:00", label: "12:00" },
                { value: "12:30", label: "12:30" },
                { value: "13:00", label: "13:00" },
                { value: "13:30", label: "13:30" },
                { value: "14:00", label: "14:00" },
                { value: "14:30", label: "14:30" },
                { value: "15:00", label: "15:00" },
                { value: "15:30", label: "15:30" },
                { value: "16:00", label: "16:00" },
                { value: "16:30", label: "16:30" },
                { value: "17:00", label: "17:00" },
                { value: "17:30", label: "17:30" },
                { value: "18:00", label: "18:00" },
                { value: "18:30", label: "18:30" },
                { value: "19:00", label: "19:00" },
                { value: "19:30", label: "19:30" },
                { value: "20:00", label: "20:00" }]
    
    if (typeof startTime === "string") {
      for (var i = 0; i < optionsList.length; i++) {
        if (optionsList[i].value === startTime) {
          startTime = optionsList[i]
        }
      }
    }
    
    let options = []
    let defaultValue = "Not Specified"
    let skip = (minDuration.value / 30) - 1
    if (startTime !== "" ) {
      for (var i = 0; i < optionsList.length; i++) {
        if (parseInt(optionsList[i].value.slice(0,2)) >= parseInt(startTime.value.slice(0,2))) {
          if (parseInt(optionsList[i].value.slice(3,5)) > parseInt(startTime.value.slice(3,5)) || parseInt(optionsList[i].value.slice(0,2)) > parseInt(startTime.value.slice(0,2))) {
            if (skip > 0) { 
              skip -= 1
              continue
            }
            options.push(optionsList[i])
          } 
        }
      }
    }
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

