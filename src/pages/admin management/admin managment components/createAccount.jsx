import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RoleSelect from './roleSelect'
import { useHistory } from 'react-router-dom'

function CreateAccount( { closeModal,roomId } ) {

  const [baseImage, setBaseImage] = useState("")
  const access_token = sessionStorage.getItem("token")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [isNotFilleEerything, setIsNotFilleEerything] = useState(true)
  const [isMatch, setIsMatch] = useState(false)
  const [isFirst, setIsFirst] = useState(false)

  let history = useHistory()

  const uploadImage = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setBaseImage(base64)
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  function onChangeInputRole(value){
    setRole(value)
  }

  const onClick = async (event) => {

    let checkAll = true
    let checkPassword = false

    console.log(firstName)
    if (firstName === "") {
       setIsNotFilleEerything(true)
       checkAll = true
    }
    else {
       setIsNotFilleEerything(false) 
       checkAll = false
    }
    console.log(lastName)
    if (lastName === "") {
       setIsNotFilleEerything(true) 
       checkAll = true
    }
    else {
       setIsNotFilleEerything(false)
       checkAll = false 
    }
    console.log(userName)
    if (userName === "") {
       setIsNotFilleEerything(true) 
       checkAll = true
    }
    else {
       setIsNotFilleEerything(false)
       checkAll = false 
    }
    console.log(password)
    if (password === "") {
       setIsNotFilleEerything(true) 
       checkAll = true
    }
    else {
       setIsNotFilleEerything(false)
       checkAll = false 
    }
    console.log(confirmPassword)
    if (confirmPassword === "") {
       setIsNotFilleEerything(true) 
       checkAll = true
    }
    else {
       setIsNotFilleEerything(false) 
       checkAll = false
    }
    console.log(baseImage)
    if (baseImage === "") {
       setIsNotFilleEerything(true) 
       checkAll = true
    }
    else {
       setIsNotFilleEerything(false)
       checkAll = false
    }
    if (password === confirmPassword && password !== "") {
       setIsMatch(true)
       checkPassword = true
    }
    else {
       setIsMatch(false)
       checkPassword = false
    }

    setIsFirst(true)
    if (checkPassword && (!checkAll)) { 
      try {
        await axios({
            url: "https://arr-dev.azurewebsites.net/api/v1/webs/new-admin",
            headers: {
                'Authorization': 'Bearer ' + access_token
                },
            method: "POST",
            data: {
              FirstNameEn : firstName,
              LastNameEn : lastName,
              UserName : userName,
              Password : password,
              MemberPictureUrl : baseImage,
              RoleId : role.value
            }
        })
        .then((res) => {
          alert("Your account has been created")
          history.push("/adminManagement")
          window.location.reload("/adminManagement")
        })
      } catch (err) {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      }
    }
  }
    return(
        <div>
            <div className="createAccount-modal">
                <div className="createAccount-modalContainer">
                    <div className="title">CREATE ACCOUNT</div>
                    <div className="body">
                        <form className="new-col-12">            
                            <label className="col-6 firstForm">First Name</label>
                            <label className="col-6 secondForm">Last Name</label>
                            <textarea  className="size" placeholder={"First Name"} onChange={event => setFirstName(event.target.value)} ></textarea>
                            <textarea  className="size  secondP" placeholder={"Last Name"} onChange={event => setLastName(event.target.value)} ></textarea>

                            <div className='rowWWWW'>
                            <label className="col-6 firstForm">Username</label>
                            <label className="col-6 secondForm">Profile Image</label>
                            <textarea  className="size" placeholder={"User Name"} onChange={event => setUserName(event.target.value)} ></textarea>
                            <input  type="file" className="col-6 size form-control thirdP" id="customFile" onChange={(e) => {uploadImage(e)}}></input>
                            </div>

                            <label className="col-6 firstForm">Password</label>
                            <label className="col-6 secondForm">Confirm Password</label>
                            <input className="size" type="password" placeholder={"Password"} onChange={event => setPassword(event.target.value)} ></input>
                            <input className="size  secondP" type="password" placeholder={"Confirm Password"} onChange={event => setConfirmPassword(event.target.value)} ></input>

                            <label className="col-6 firstForm">Role</label>
                            <RoleSelect onChange={onChangeInputRole} className="size zero" oldValue={null}/>
                        </form>
                    </div>

                    <div className="footer">
                        <button className="btn btn-danger btn-sm" onClick={onClick} type="button">Save</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                    {isFirst && isNotFilleEerything && <p>Please fill everything</p>}
                    {isFirst && !isMatch && <p>Password is not match with confirm password.</p>}
                </div>
            </div>
        </div>
    )
}

export default CreateAccount