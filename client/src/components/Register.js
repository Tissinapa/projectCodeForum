import React from 'react'
import {useState} from "react"
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
//import Button from '@mui/joy/Button';

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
        <Typography level="h1" sx={{ textAlign: 'center' ,fontWeight: 'bold'}}>Here you can register</Typography>
        <form onSubmit={submit} onChange={handelChange}>
            
            <Input type="email" name="email" variant="outlined" color="primary" placeholder="Email" size="md" sx={{m: 2}}/>
            <Input type="password" name="password" variant="outlined" color="primary" placeholder="Password" size="md"sx={{m: 2}}/> 
            
            <Input type="submit" variant="outlined" color="success" value="Submit" sx={{m: 2}}/>
        </form>
    </div>
  )
}

export default Register