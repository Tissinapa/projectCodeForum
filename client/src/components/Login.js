import React from 'react'
import {useState} from "react"
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

function Login() {
    const [users, setUsersData] = useState({})
    const auth_token = localStorage.getItem("auth_token")
    
  
    //Post login input to server side
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
          //If login is succesfull stores the token part to local storage
          //also validates the user at sametime
          storeToken(data.token)
          validation()
          window.location.href="/"
          
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
        <Typography level="h1" sx={{ textAlign: 'center' ,fontWeight: 'bold',fontSize: 40 ,marginTop: 10}}>Login</Typography>
        <form onSubmit={submit} onChange={handelChange}>
            <Input type="email" name="email" variant="outlined" color="primary" placeholder="Email" size="md" sx={{m: 2}}/>
            <Input type="password" name="password" variant="outlined" color="primary" placeholder="Password" size="md"sx={{m: 2}}/> 
            <Input type="submit" variant="outlined" color="success" value="Submit" sx={{m: 2}}/>
        </form>
    </div>
  )
}

export default Login