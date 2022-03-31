import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import '../../../App.css';
import axios from 'axios';

const customStylesBuilding = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Bariol Regular',
    boxShadow: 0,
    left: "21.55rem",
    top: "0rem",
    width: "10rem",
    cursor: 'text',
    borderRadius: 5,
    fontSize: "0.8rem",
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
    left: "22.5rem",
    top: "1.9rem",
    boxShadow: 'none',
    borderRadius: 5,
    fontSize: "0.8rem",
    width: "10rem",
    
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
}

function MyComponent() {

  const [data, setData] = useState([]);
  let options = [{ value: "Not Specified", label: "Not Specified" }]

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
  };

  useEffect(() => {
    postdata();
  },[]);

  data.forEach(e => {
    options.push({ value: e.text, label: e.text })
  });

  const onChange = (e) => {
    window.sessionStorage.setItem("building", e.value)
  }


  return (
    <Select
      className="col-2"
      options={options}
      placeholder="Not Specified"
      styles={customStylesBuilding}
      onChange={onChange}
    />
  );
}

export default MyComponent;

