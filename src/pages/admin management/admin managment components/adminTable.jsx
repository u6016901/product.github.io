import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import ModifyAccount from "./modifyAccount";
import DeleteAdmin from "./deleteAdmin";



const AdminTable = (props) =>  {

  const [itemRow, setItemRow] = useState([])
  const [dataWeb, setDataWeb] = useState([])
  const [idFromTable, setIdFromTable] = useState()
  const [codefromTable, setCodeFromTable] = useState()
  const [amountfromTable, setAmountFromTable] = useState()
  const [categoryNamefromTable, setCategoryNameFromTable] = useState()
  const [dateFromTable, setDateFromTable] = useState()

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  
  const access_token = sessionStorage.getItem("token")

  const postData = async () => {
    try {
     const res = await axios({
        url: "https://projectwebau.herokuapp.com/transections",
        method: "GET",
      })
      .then((res) => {
        console.log(res.data)
        setDataWeb(res.data)
      });
      } catch (err) {
        console.log(err);
      }
  };

  // const postdata = async () => {
  //     try {

        
  //       let status = window.sessionStorage.getItem("status")
  //       let date = window.sessionStorage.getItem("date")

  //       if (status == "Not Specified") { status = null }
  //       if (date === "null") { date = null}

  //       const allMonts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //       let monts = ""

           
  //       let count = 1

        
        
  //       if (date !== null) {
  //         allMonts.map( (e) => {
  //           if (e === date.toString().slice(4,7)) {
  //             if (count < 10) {
  //               monts = "0" + count.toString()
  //             }
  //             else { monts = count.toString()}
  //           }
  //           count += 1
  //         })
  //         let newDate = (monts + "/" + date.toString().slice(8,10) + "/" + date.toString().slice(11,15))
  //         date = newDate .toString() 
  //       }
  //       if (status !== null) {
  //         status = status.toString()
  //       }

  //       const res = await axios({
  //         url: "https://arr-dev.azurewebsites.net/api/v1/webs/admin",
  //         headers: {
  //             'Authorization': 'Bearer ' + access_token
  //             },
  //         method: "GET"
  //     })
  //     .then((res) => {
  //         let itemData = res.data.data
  //         console.log(itemData)
  //         setDataRow(itemData)
  //      });
  //     } catch (err) {
  //         console.log(err);
  //     }
  //  };

  useEffect(() => {
    // postdata();
    postData();
  },[]);

  useEffect(() => {
    let dataArray = JSON.parse(JSON.stringify(dataWeb))
    var reservationData = []
    dataArray.map((item,index)=>{
      
      const id = item._id
      const code = item.code
      const amount = item.amount
      const categoryName = item.categoryName
      const date = item.createAt

      item.modify = (
        <div>
        <i class='card_room_management_room_writeimg bx bx-edit'
            style={{
              marginLeft: "12px", 
              cursor: "pointer",
              color: "black",
              fontSize: "1rem",
            }}
            onClick={() => onClickModify(id, code, amount, categoryName, date)}
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
            onClick={() => onClickDelete(id)}>
          </i>
        </div>
      );

      item.createAt = item.createAt.toString().slice(0, 9)

     reservationData.push(item)
    })

      setItemRow(reservationData)
      
    },[dataWeb]);

  const data = {
    columns: [
      {
        label: 'CODE',
        field: 'code',
        sort: 'asc',
        width: 50
      },
      {
        label: 'CATEGORY',
        field: 'categoryName',
        sort: 'acs',
        width: 50
      },
      {
        label: 'AMOUNT',
        field: 'amount',
        sort: 'asc',
        width: 50
      },
      {
        label: 'TIME',
        field: 'createAt',
        sort: 'asc',
        width: 80
      },
      {
        label: 'EDIT',
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

  function onClickModify(id, code, amount, categoryName, date) {
    setOpenModal(true)
    console.log(id)
    setIdFromTable(id)
    setCodeFromTable(code)
    setAmountFromTable(amount)
    setCategoryNameFromTable(categoryName)
    setDateFromTable(date)
  }

  function onClickDelete(id) {
    setOpenModal2(true)
    console.log(id)
    setIdFromTable(id)
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
        {openModal && <ModifyAccount closeModal={setOpenModal} idFromTable={idFromTable} codeFromTable={codefromTable} amountFromTable={amountfromTable} categoryNameFromTable={categoryNamefromTable} dateFromTable={dateFromTable} />}
        {openModal2 && <DeleteAdmin closeModal={setOpenModal2} id={idFromTable} />}
      </div>
    </div>

  );
}


export default AdminTable;