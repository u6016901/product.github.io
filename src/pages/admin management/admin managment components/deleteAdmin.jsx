import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

function DeleteAdmin({closeModal, id}) {

    let history = useHistory();

    const access_token = sessionStorage.getItem("token")

    const onClick = (event) => {
        event.preventDefault();
        axios({
            url: `https://projectwebau.herokuapp.com/transections/${id}`,
            method: "DELETE"
        })
        .then((res) => {
            console.log("okay", res.data)
            alert("The transection has been deleted")
            history.push("/adminManagement")
            window.location.reload("/adminManagement");
        })
        .catch((err) => {
            console.log(err.response)
            alert("Failed to delete account")
        });
    }

    return(
        <div>
            <div className="logout-modal">
                <div className="delete-modalContainer">
                    <div className="title">DELETE TRANSECTION</div>
                    <div className="body">
                        Are you sure to delete?
                    </div>
                    <div className="footer">
                        <button className="btn btn-danger btn-sm" onClick={onClick} type="button">OK</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAdmin