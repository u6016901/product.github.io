import '../../App.css';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router'
import axios from 'axios';

 
function ChangePassword() {

  let history = useHistory();

  const access_token = sessionStorage.getItem("token")
  const memberId = sessionStorage.getItem("memberId")
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [alert, setAlert] = useState("");


  if(!access_token){
    history.push("/")
    window.location.reload("/");
  }


  const handleSubmit = async (event) => {

    event.preventDefault();

    const confirmation = []

    if (currentPassword != sessionStorage.getItem("password")) {
      setAlert("The current password is incorrect")
    } else if (newPassword == sessionStorage.getItem("password")) {
      setAlert("The current password and the new password are the same")
    } else if (newPassword != confirmPassword){
      setAlert("The confirmation password does not match the new password")
    } else {
      confirmation.push(newPassword)
      console.log("confirmation", confirmation)
    }

    console.log("confirmation1", confirmation[0])
    const cfPassword = confirmation[0]

    

      const res = await axios({
         url: `https://arr-dev.azurewebsites.net/api/v1/webs/change-password/${memberId}/${cfPassword}`,
         headers: {
             'Authorization': 'Bearer ' + access_token
             },
         method: "GET"
     })
    .then((res) => {

      console.log("aa")
    if (res.status == 200) {
      if ( (currentPassword == sessionStorage.getItem("password")) && ( newPassword != sessionStorage.getItem("password") ) && (( newPassword == confirmPassword ) != null)){
        history.push("/login")
        sessionStorage.clear()
      }
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="changePassword_container">
      <form class="changePassword_form" onSubmit={handleSubmit}>
      <p class="changePassword">CHANGE PASSWORD</p>
        <input
          onChange={event => setCurrentPassword(event.target.value)}
          value={currentPassword}
          required
          type="password"
          id="currentPassword"
          name="CurrentPassword"
          placeholder="Current password"
        />
        <input
          required
          onChange={event => setNewPassword(event.target.value)}
          value={newPassword}
          type="password"
          id="newPassword"
          name="NewPassword"
          placeholder="New password"
        />
        <input
          required
          onChange={event => setConfirmPassword(event.target.value)}
          value={confirmPassword}
          type="password"
          id="confirmNewPassword"
          name="ConfirmNewPassword"
          placeholder="Confirm New password"
        />
        <br/>
        <br/>
        <button>Confirm</button>
       
        
        <div class="password_wrong">
          {alert}
        </div>

    </form>
  </div>
  );
}
 
export default ChangePassword;