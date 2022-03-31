import React, { useEffect, useState } from "react";
import axios from 'axios';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
// import { red } from "@material-ui/core/colors";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function RevokeRoomCell({data, selectAll, onClickCheckedBooking}) {
    // console.log(data, selectAll)

    const [checked, setChecked] = useState(selectAll);
    
    const handleChange = (event) => {
      setChecked(event.target.checked)
      onClickCheckedBooking(data.bookingId, event.target.checked)
    };

    return(
        <div>
          <div class="revoke-cell">
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            {...label}
            sx={{
              color: red[0],
              '&.Mui-checked': {
                color: red[700],
              },
            }}
          />
            {data.time} hrs. 
          </div>
          <div class="revoke-tab">
            {data.meetingTitle} 
          </div>
          <hr class="hr-disable"/>
        </div>
    )
}

export default RevokeRoomCell;