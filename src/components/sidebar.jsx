import React, { useState } from 'react';
import logo from '../assets/logo.png';
// import profile from '../assets/profile.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LogOutModal from './logOutModal';
import axios from 'axios';
import { useEffect } from 'react';
import ReservationListModal from './reservationListModal';



const Sidebar = () => {

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive); 
   };

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [memberRoleIdForChecking, setMemberRoleIdForChecking] = useState("")

  

  const access_token = sessionStorage.getItem("token")
  
  const [fname,setFname] = useState("");
  const [pic,setPic] = useState("");


  const infoProfile = async () => {
    try {
     const res = await axios({
        url: "https://arr-dev.azurewebsites.net/api/v1/webs/member-info",
        headers: {
            'Authorization': 'Bearer ' + access_token
            },
        method: "POST",
        data: {
          Username : sessionStorage.getItem("username"),
          Password : sessionStorage.getItem("password")
        }
    })
    .then((res) => {
        console.log(res.data.data[0]);
        setFname(res.data.data[0].memberNameEn)
        setPic(res.data.data[0].memberPictureUrl)
        window.sessionStorage.setItem("name", res.data.data[0].memberNameEn)
        window.sessionStorage.setItem("memberId", res.data.data[0].memberId)
        window.sessionStorage.setItem("memberRoleId", res.data.data[0].memberRoleId)
        window.sessionStorage.setItem("memberRoleName", res.data.data[0].memberRoleName)
        setMemberRoleIdForChecking(res.data.data[0].memberRoleId.toString())
     });
    } catch (err) {
        console.log(err);
    }
 };

  useEffect(() => {
    infoProfile();
  },[]);

  let list = null
  let isMasterAdmin = false
  if (memberRoleIdForChecking.toString() === "6") { isMasterAdmin = true}
  if (isMasterAdmin) {
    list = (
      <li>
        <Link to="/adminManagement">
          <i class='bx bx-user'></i>
          <span class="links_name" >Admin Management</span>
        </Link>
      </li>
    );
  }


  return (

    <body>
      <div className={isActive ? "sidebar" : "sidebar active"}>
        <div class="logo_content">
          <div class="logo">
            <img src={logo} width="150px" height="90px"></img> 
          </div>

          <div className={isActive ? "menu" : "menu active"}>
          </div>

        </div>

        <div class="profile_content">

          <div class="profile">

            <div class="profile_details row">
              <div class="col-sm-3">
                <img src={pic} alt="new" width="50" height="50"/>
              </div>
              <div class="firstName_lastName col-sm-7">
                <div class="firstName font-face-bariol-bold">{fname.split(" ")[0]}</div>
                <div class="lastName font-face-bariol-regular">{fname.split(" ")[1]}</div>
              </div>
            </div>
          </div>
        </div>

        <ul class="nav_list font-face-bariol-regular">
          
            <li>
              <a href="/roomManagement">
                <i class='bx bx-building' ></i>
                <span class="links_name">Room Management</span>
              </a>
            </li>

            <li>
              <a 
              onClick={() => {setOpenModal2(true);}} >
                <i class='bx bx-calendar' ></i>
                <span class="links_name">Reservation Management</span>
              </a>
              {openModal2 && <ReservationListModal 
              closeModal={setOpenModal2} 
              />}
            </li>

            <li>
              <Link to="/history">
                <i class='bx bx-history'></i>
                <span class="links_name" >History</span>
              </Link>
            </li>

            {list}
            {/* <li>
              <Link to="/adminManagement">
                <i class='bx bx-user'></i>
                <span class="links_name" >Admin Management</span>
              </Link>
            </li> */}

            <li>
              <a href="/changePassword">
                <i class='bx bx-cog'></i>
                <span class="links_name">Change Password</span>
              </a>
            </li>

            <li>
              <a
                // className='openLogOutModal' 
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <i class='bx bx-log-out' id="log_out"></i>
                <span class="links_name">Sign Out</span>
              </a>

              {openModal && <LogOutModal closeModal={setOpenModal} />}

              {/* <button>
              <i class='bx bx-log-out'></i>
                <span class="links_name">Sign Out</span>
              </button> */}
            </li>
          
        </ul>
      </div>
    </body>
  );
};
 
export default Sidebar;
