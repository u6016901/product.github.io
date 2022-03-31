import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import ModifyAccount from "./modifyAccount";
import DeleteAdmin from "./deleteAdmin";



const AdminTable = (props) =>  {

  const [dataRow, setDataRow] = useState([])
  const [itemRow, setItemRow] = useState([])
  const [memberId, setMemberId] = useState(null)
  const [memberName, setMemberName] = useState(null)

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  
  const access_token = sessionStorage.getItem("token")

  const postdata = async () => {
      try {
        let status = window.sessionStorage.getItem("status")
        let date = window.sessionStorage.getItem("date")

        if (status == "Not Specified") { status = null }
        if (date === "null") { date = null}

        const allMonts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let monts = ""

           
        let count = 1

        
        
        if (date !== null) {
          allMonts.map( (e) => {
            if (e === date.toString().slice(4,7)) {
              if (count < 10) {
                monts = "0" + count.toString()
              }
              else { monts = count.toString()}
            }
            count += 1
          })
          let newDate = (monts + "/" + date.toString().slice(8,10) + "/" + date.toString().slice(11,15))
          date = newDate .toString() 
        }
        if (status !== null) {
          status = status.toString()
        }

        const res = await axios({
          url: "https://arr-dev.azurewebsites.net/api/v1/webs/admin",
          headers: {
              'Authorization': 'Bearer ' + access_token
              },
          method: "GET"
      })
      .then((res) => {
          let itemData = res.data.data
          console.log(itemData)
          setDataRow(itemData)
       });
      } catch (err) {
          console.log(err);
      }
   };

  useEffect(() => {
    postdata();
  },[]);

  useEffect(() => {
    let dataArray = JSON.parse(JSON.stringify(dataRow))
    console.log(dataRow)
    var reservationData = []
    dataArray.map((item,index)=>{

      const memberIdFromTable = item.id
      const memberNameFromTable = item.firstName + " " + item.lastName

      // item.area = (
      //   <div style={{ display: "flex", justifyContent: "space-between" }}>
      //     AREA
      //   </div>
      // );

      item.modify = (
        <div>
        <i class='card_room_management_room_writeimg bx bx-edit'
            style={{
              marginLeft: "12px", 
              cursor: "pointer",
              color: "black",
              fontSize: "1rem",
            }}
            onClick={() => onClickModify(memberIdFromTable)}
          > 
          </i>
        </div>
      );

      item.delete = (
        <div>
          <i class='card_room_management_room_delete bx bx-trash'
            style={{
              marginLeft: "12px", 
              cursor: "pointer",
              color: "black",
              fontSize: "1rem",
            }}
            onClick={() => onClickDelete(memberIdFromTable, memberNameFromTable)}>
          </i>
        </div>
      );

     reservationData.push(item)
    })

      setItemRow(reservationData)
      
    },[dataRow]);

  const data = {
    columns: [
      {
        label: 'USERNAME',
        field: 'userName',
        sort: 'asc',
        width: 50
      },
      {
        label: 'FIRST NAME',
        field: 'firstName',
        sort: 'acs',
        width: 50
      },
      {
        label: 'LAST NAME',
        field: 'lastName',
        sort: 'asc',
        width: 50
      },
      {
        label: 'ROLE',
        field: 'role',
        sort: 'asc',
        width: 50
      },
      {
        label: 'AREA',
        field: 'area',
        sort: 'asc',
        width: 80
      },
      {
        label: 'MODIFY',
        field: 'modify',
        sort: 'asc',
        width: 80
      },
      {
        label: 'DELETE',
        field: 'delete',
        sort: 'asc',
        width: 80
      }
  ],
  rows: itemRow
  } 
      if (!sessionStorage.getItem("token")) {

        return <Redirect to="/" />
      }

  function onClickModify(memberIdFromTable) {
    setOpenModal(true)
    setMemberId(memberIdFromTable)
  }

  function onClickDelete(memberIdFromTable, memberNameFromTable) {
    setOpenModal2(true)
    setMemberId(memberIdFromTable)
    setMemberName(memberNameFromTable)
  }

  return (
    <div className="adminTable">
      <MDBDataTable
        striped
        bordered
        small
        
        searching={false}
        sortable={false}
        displayEntries={false}
        data={data}
      />
      <div>
        {openModal && <ModifyAccount memberId={memberId} closeModal={setOpenModal} />}
        {openModal2 && <DeleteAdmin memberId={memberId} closeModal={setOpenModal2} memberName={memberName} />}
      </div>
    </div>

  );
}


export default AdminTable;