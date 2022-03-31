import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

function DeleteRoom({closeModal,roomId}) {

    let history = useHistory();

    const access_token = sessionStorage.getItem("token")

    const [content, setContent] = useState('');

    const postdata = async () => {
        try {
        console.log("room id",roomId)
        const res = await axios({
            url: `https://arr-dev.azurewebsites.net/api/v1/webs/number-reservation/${roomId}`,
            headers: {
                'Authorization': 'Bearer ' + access_token
                },
            method: "GET",
            data: {
            }
        })
        .then((res) => {
            console.log("res", res.data.data)
            if (res.data.data > 0) {
                if (res.data.data == 1){
                    setContent("There are " + res.data.data + " reservation. Are you sure you want to revoke it?")
                }
                else {
                    setContent("There are " + res.data.data + " reservations. Are you sure you want to revoke it?")
                }
                
            } else {
                setContent("")

            }
        });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        postdata();
    },[]);

    const onClick = (event) => {
        event.preventDefault();
        axios({
            url: `https://arr-dev.azurewebsites.net/api/v1/webs/rooms-delete/${roomId}`,
            headers: {
                'Authorization': "Bearer " + access_token
                },
            method: "POST",
            data: {}
        })
        .then((res) => {
            console.log("okay", res.data)
            alert("Your room has been deleted")
            let path = `/roomManagement`
            history.push(path)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err.response)
            alert("Failed to delete room")
        });
    }

    return(
        <div>
            <div className="logout-modal">
                <div className="delete-modalContainer">
                    <div className="title">DELETE ROOM</div>
                    <div className="body">
                    {content}
                    {/* There are 26 reservations. Are you sure you want to revoke it? */}
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

export default DeleteRoom