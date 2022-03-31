import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RoleSelect from './roleSelect'
import { useHistory } from 'react-router-dom'

function CreateAccount( { closeModal,roomId } ) {
   const access_token = sessionStorage.getItem("token")

   const [code, setCode] = useState("")
   const [amount, setAmount] = useState("")
   const [category, setCategory] = useState("")
   const dateNow = new Date()

   let history = useHistory()

   function onChangeInputRole(value){
    setCategory(value.value)
   }

   const onClick = async (event) => {
      try {
         console.log(code)
         console.log(category)
         console.log(amount)
         console.log(dateNow)
         await axios({
            url: "https://projectwebau.herokuapp.com/transections",
            method: "POST",
            data: {
               code: code,
               categoryName: category,
               amount: amount,
               createAt: dateNow
            }
         })
         .then((res) => {
          alert("Your new transection has been created")
          history.push("/adminManagement")
          window.location.reload("/adminManagement")
         })
      } catch (err) {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      }
   }
    return(
        <div>
            <div className="createAccount-modal">
                <div className="createAccount-modalContainer">
                    <div className="title">NEW TRANSECTION</div>
                    <div className="body">
                        <form className="new-col-12">            
                            <label className="col-6 firstForm">Code</label>
                            <label className="col-6 secondForm">Amount</label>
                            <textarea  className="size" placeholder={"Ex. 001"} onChange={event => setCode(event.target.value)} ></textarea>
                            <textarea  className="size  secondP" placeholder={"Ex. 100"} onChange={event => setAmount(event.target.value)} ></textarea>
                            <label className="col-6 firstForm">Category</label>
                            <RoleSelect onChange={onChangeInputRole} className="size zero" oldValue={null}/>
                        </form>
                    </div>

                    <div className="footer">
                        <button className="btn btn-danger btn-sm" onClick={onClick} type="button">New</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => closeModal(false)} id="cancelLogOut">Cancel</button>
                    </div>
                    {/* {isFirst && isNotFilleEerything && <p>Please fill everything</p>}
                    {isFirst && !isMatch && <p>Password is not match with confirm password.</p>} */}
                </div>
            </div>
        </div>
    )
}

export default CreateAccount