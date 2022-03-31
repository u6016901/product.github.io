
import Table from '../../components/table'
import cardImg from '../../assets/cardImg.png';
import StatusDropDown from '../../components/statusDropDown';
// import DateDropDown from '../reservation management/reservation management components/dateDropDown';
import DateDropDown from '../../components/defaultDateDropDown';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router'


 
function History(props) {

  let status = window.sessionStorage.getItem("status")
  let date = window.sessionStorage.getItem("date")

  const renderData = () => {
    window.location.reload("/history");
  }

  const access_token = sessionStorage.getItem("token")

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    props.onCollapse(!isActive);
  }, [!isActive]);

  let history = useHistory();
  
  if(!access_token){
    history.push("/")
    window.location.reload("/");
  }

  date = "dd/mm/yyyy"

  return (
    <div> 
      <body >      
        <div class="card">
          <img class="card-img-top" src={cardImg}></img>
            <div class="card-img-overlay">
              <div className={props.isActive ? "headContent" : "headContent active"}>
                <h4 class="card-title ">HISTORY</h4>
              </div>
              <p class="content card-text">Suvarnabhumi Campus</p>
            </div>
        </div>
        
        <h1 class="search_container_date"> Date </h1>
        <h1 class="search_container_status"> Status </h1>
        <div class="date-drop-down">
        <DateDropDown oldValue={date} />
        </div>
        <StatusDropDown oldValue={status}  />
        <button class="search_button" onClick={renderData}>Search</button>
        <Table />
      </body>
    </div>
  );
}
 
export default History;