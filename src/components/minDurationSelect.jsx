import React from 'react'
import Select from 'react-select'

const customStylesBuilding = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Bariol Regular',
    boxShadow: 0,
    top: "0rem",
    width: "10rem",
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
      backgroundColor: isFocused ? 'white' : 'white',
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
    top: "1.9rem",
    boxShadow: 'none',
    borderRadius: 5,
    fontSize: '0.8rem',
    width: "14rem"
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
    fontSize: '0.8rem'
  }),
}



function MinDurationSelect({onChange, oldValue}) {

  let options = [{ value: 30 , label: "30 min." },
                { value: 60 , label: "1 hr." },
                { value: 90 , label: "1 hr. 30 min." },
                { value: 120 , label: "2 hrs." },
                { value: 150 , label: "2 hrs. 30 min." },
                { value: 180 , label: "3 hrs." }]  

  let defaultValue = "Not Specified"
  if (oldValue !== null) {
    for (var i = 0; i < options.length; i++) {
      if (oldValue === options[i].value) {
        defaultValue = options[i].label
      }
    }
  }

  return (
    <Select
      options={options}
      placeholder={defaultValue}
      styles={customStylesBuilding}
      onChange={onChange}
    />
  );
}

export default MinDurationSelect ;

