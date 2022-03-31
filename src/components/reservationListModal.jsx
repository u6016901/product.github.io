import React from "react";
import { useHistory } from 'react-router-dom';
import TableReservationList from './tableReservationList'


function ReservationListModal({closeModal}) {
    // console.log("test0",{closeModal})
    

    

    const history = useHistory();

    const goToReservationManagement = () => {
        let path = `/reservationManagement`
        history.push(path)
    }

    return(
        <div>
            <div className="reservationList-modal" >
                <div className="reservationList-modalContainer">
                    <button id='close' 
                    onClick={() => {closeModal(false); goToReservationManagement()}}>close</button>
                    <div className="title">LATEST RESERVATION
                    </div>
                    
                    <div className="body">
                   
                        <TableReservationList 
                        // closeModal={closeModal()} 
                        />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ReservationListModal