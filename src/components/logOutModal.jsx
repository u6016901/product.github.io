import React from "react";
import { useHistory } from 'react-router-dom';

function LogOutModal({closeModal}) {

    const history = useHistory();

    
    const handleLogoutClick = () => {
        sessionStorage.clear()
        
        history.push("/login")
    }


    return(
        <div>
            <div className="logout-modal">
                <div className="logout-modalContainer">
                    <div className="title">SIGN OUT</div>
                    <div className="body">Are you sure you want to sign out?</div>
                    <div className="footer">
                        <button className="btn btn-danger btn-sm" type="button" onClick={() => handleLogoutClick()} >OK</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default LogOutModal