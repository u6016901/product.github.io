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
    top: "-2.6rem",
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
    left: "15.5rem",
    top: "-1.1rem",
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


function MyComponent({onChange, oldValue}) {

  const [data, setData] = useState([]);
  let options = []

  const postdata = async () => {
  const access_token = sessionStorage.getItem("token")

    axios({
      url: "https://arr-dev.azurewebsites.net/api/v1/webs/bookings/purposes",
      headers: {
          'Authorization': "Bearer " + access_token
          },
      method: "GET",
    })
    .then((res) => {
      setData(res.data.data)
    })
    .catch((res) => {
      // Todo Do Something
    });
  };

  useEffect(() => {
    postdata();
  },[]);

  data.forEach(e => {
    options.push({ value: e.id, label: e.text })
  });

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

export default MyComponent;

