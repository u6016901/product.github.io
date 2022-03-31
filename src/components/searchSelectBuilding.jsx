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
    width: "14rem",
    boxShadow: 'none',
    borderRadius: 5,
    fontSize: "0.8rem",
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
    fontSize: "0.8rem"
  }),
}

function SearchSelectBuilding({onChange, oldValue}) {

  const [data, setData] = useState([]);
  let options = []

  const postdata = async () => {
    const access_token = sessionStorage.getItem("token")
    
    axios({
      url: "https://arr-dev.azurewebsites.net/api/v1/webs/buildings",
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
    options.push({ value: e.text, label: e.text })
  });

  let defaultValue = "Not Specified"
  if (oldValue !== null) {
    defaultValue = `${oldValue}`
  }

  return (
    <Select
      // className="col-2"
      options={options}
      placeholder={defaultValue}
      styles={customStylesBuilding}
      onChange={onChange}
    />
  );
}

export default SearchSelectBuilding;

