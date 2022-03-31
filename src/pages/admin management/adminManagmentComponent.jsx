import React, { useState } from 'react';

// import FloorList from './floorList';
import axios from 'axios';
import AdminTable from './admin managment components/adminTable';
import CreateAccount from './admin managment components/createAccount';


const AdminManagmentComponent = () => {
    
    const access_token = sessionStorage.getItem("token")

    const [openModal, setOpenModal] = useState(false);

    return (
        
        <div class="room_management">
            <button className='create_room_button' onClick={() => {setOpenModal(true);}}>
                <span class="links_name">Create Account</span>
            </button>
            <AdminTable />
            {openModal && <CreateAccount closeModal={setOpenModal} />}
        </div>
    );
}

export default AdminManagmentComponent;