import React, { useState } from 'react';
import SearchSelectBuilding from "./searchSelectBuilding";
import SearchSelectFloor from "./searchSelectFloor";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import FloorList from './floorList';
import axios from 'axios';
import CreateRoom from './createRoom';


function SearchRoomManagement(props) {
    
    const access_token = sessionStorage.getItem("token")
    const memberId = sessionStorage.getItem("memberId")

    const [nonData, setNonData] = useState(true);
    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);

    const onClick = async (event) => {
        event.preventDefault();

        let buildings = window.sessionStorage.getItem("building")
        let floors = window.sessionStorage.getItem("floor")

        if (buildings === "Not Specified") { buildings = null  }
        if (floors === "Not Specified") { floors = null }

        console.log(memberId)
        
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
            
            if (res.data.data.length !== 0) {
                setNonData(false)
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
            <SearchSelectBuilding />
            <SearchSelectFloor />
            <BootstrapSwitchButton onlabel='Admin User' offlabel='Regular User' width={20} height={10} checked={false}/>
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