import React from 'react'
import {useState} from "react"

function Register() {
    const [users, setUsersData] = useState({})
  

    const submit = (event)=>{
      event.preventDefault()
      fetch("api/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(users),
        mode: "cors"
      })
  
    }
   const handelChange = (event) =>{
    setUsersData({...users, [event.target.name]: event.target.value}) 
   }
  return (
    <div>
        <h1>Here you can register</h1>
        <form onSubmit={submit} onChange={handelChange}>
            <input type="email" name="email"/>Email 
            <input type="password" name="password"/>Password
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default Register