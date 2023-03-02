import React from 'react'
import {useState} from "react"


function Login() {
    const [users, setUsersData] = useState({})
    const auth_token = localStorage.getItem("auth_token")
    
  

    const submit = (event)=>{
      event.preventDefault()
      fetch("api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(users),
        mode: "cors"
      })
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        if(data.token){
          //setJwt(data.token)
          storeToken(data.token)
          validation()
          //setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()))
        }
      })
  
    }
    function storeToken(token){
      localStorage.setItem("auth_token",token) 
    }

    const validation = ()=>{
      
      fetch("api/private", {
        method: "GET",
        headers: {
          "authorization": "Bearer " + auth_token
        },

      })
      .then(response => response.text())
      .then(data =>{
        console.log(data)
      })

    }
   const handelChange = (event) =>{
    setUsersData({...users, [event.target.name]: event.target.value}) 
   }
  return (
    <div>
        <h1>Here you can Login</h1>
        <form onSubmit={submit} onChange={handelChange}>
            <input type="email" name="email"/>Email 
            <input type="password" name="password"/>Password
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default Login