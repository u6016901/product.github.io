import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios';

const customStylesBuilding = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Bariol Regular',
    boxShadow: 0,
    top: "0rem",
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
    top: "1.9rem",
    boxShadow: 'none',
    borderRadius: 5,
    fontSize: "0.8rem",
    width: "14rem"
    
  }),

  menuList: styles => ({
    ...styles,
    height: "6rem",
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
    fontSize: "0.8rem"
  })
}

function RoleSelect({onChange, oldValue}) {

    const access_token = sessionStorage.getItem("token")
    const [data, setData] = useState(null)

    const postdata = async () => {
        try {
          const roomInfo = await axios({
            url: `https://projectwebau.herokuapp.com/categories`,
            method: "GET",
        })
        .then((res) => {
            console.log(res.data)
            setData(res.data)
        });
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        postdata();
      },[]);

    let options = []
    if (data !== null) {
      data.forEach( e => {
        options.push( { value: e.name, label: e.name } )
      });
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

export default RoleSelect ;

