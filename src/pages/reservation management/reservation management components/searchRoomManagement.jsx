import React, { useEffect, useState } from 'react';
import SearchSelectBuilding from "./searchSelectBuilding";
import SearchSelectFloor from "./searchSelectFloor";
import DateDropDown from './dateDropDown';

import FloorList from './floorList';
import axios from 'axios';
import CreateRoom from '../../../components/createRoom';


function SearchRoomManagement(props) {
    
    const access_token = sessionStorage.getItem("token")

    const [nonData, setNonData] = useState(true);
    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);

    const onClick = async (event) => {
        event.preventDefault();

        let buildings = window.sessionStorage.getItem("building")
        let floors = window.sessionStorage.getItem("floor")

        if (buildings == "Not Specified") { buildings = null  }
        if (floors == "Not Specified") { floors = null }
        
        await axios({
            url: "https://arr-dev.azurewebsites.net/api/v1/webs/explore-rooms",
            headers: {
                'Authorization': "Bearer " + access_token
                },
            method: "POST",
            data: {
                Building : buildings,
                Floor : floors,
        }
        })
        .then((res) => {
            setData(res.data.data)
            
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
            <h1 class="search_container_date">Date</h1>
            <SearchSelectBuilding />
            <SearchSelectFloor />
            <DateDropDown />
            <button class="search_button_room" onClick={onClick}> Search </button>
            {nonData && <div class="room_management_not_find">
                No Room Management
            </div>}
            {!nonData && <div  class="row canScroll">
                {listFloor}
            </div>}
            <button className='create_room_button' onClick={() => {setOpenModal(true);}}>
                <span class="links_name">Create Room</span>
            </button>
            {openModal && <CreateRoom closeModal={setOpenModal} />}

        </div>
    );
}

export default SearchRoomManagement;