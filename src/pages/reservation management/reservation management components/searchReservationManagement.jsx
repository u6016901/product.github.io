import React, { useEffect, useState } from 'react';
import SearchSelectBuilding from "../../room management/room management components/searchSelectBuilding";
import SearchSelectFloor from "../../room management/room management components/searchSelectFloor";
import DefaultDateDropDown from '../../../components/defaultDateDropDown';
import FloorList from './floorList';
import axios from 'axios';



function SearchReservationManagement(props) {
    
    const access_token = sessionStorage.getItem("token")

    const [nonData, setNonData] = useState(true);
    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);
    const memberId = sessionStorage.getItem("memberId")

    const onClick = async (event) => {
        event.preventDefault();

        let buildings = window.sessionStorage.getItem("building")
        let floors = window.sessionStorage.getItem("floor")
        let dates = window.sessionStorage.getItem("date")
        console.log(dates)


        if (buildings == "Not Specified") { buildings = null  }
        if (floors == "Not Specified") { floors = null}
        
        await axios({
            url: "https://arr-dev.azurewebsites.net/api/v1/webs/explore-rooms",
            headers: {
                'Authorization': "Bearer " + access_token
                },
            method: "POST",
            data: {
                Building : buildings,
                Floor : floors,
                MemberId : memberId
        }
        })
        .then((res) => {
            setData(res.data.data)
            console.log(res.data.data)
            // ! window.sessionStorage.setItem("building", buildings)
            // ! window.sessionStorage.setItem("floor", floors)
            
            if (res.data.data.length != 0) {
                setNonData(false)
                window.sessionStorage.setItem("building", "Not Specified")
                window.sessionStorage.setItem("floor", "Not Specified")
            }
            else {
                setNonData(true)
            }
        })
        .catch((res) => {
            // Todo Do Something
        });
    }

    let listFloor = null

    if (data) {
        listFloor = data.map((Floor) => 
            <FloorList data={Object.values(Floor)} />
        );
    }

    return (
        <div class="room_management">
            <h1 class="search_container_building">Building</h1>
            <h1 class="search_container_floor">Floor</h1>
            <h1 class="search_container_date1"> Date </h1>
            <SearchSelectBuilding />
            <SearchSelectFloor />
            <div class="date-drop-down third-select">
                <DefaultDateDropDown />
            </div>
            <button class="search_button_room1" onClick={onClick}> Search </button>
            {nonData && <div class="room_management_not_find">
                No Reservation Management
            </div>}
            {!nonData && <div  class="row canScroll">
                {listFloor}
            </div>}
           
            {/* <button className='create_room_button' onClick={() => {setOpenModal(true);}}>
                <span class="links_name">Create Room</span>
            </button>
            {openModal && <CreateRoom closeModal={setOpenModal} />} */}

       
        </div>
    );
}

export default SearchReservationManagement;