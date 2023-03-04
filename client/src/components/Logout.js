import React from 'react'
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

function Logout() {
    //const auth_token = localStorage.getItem("auth_token")
    
    function logoutFunction(){
        localStorage.removeItem("auth_token")
        window.location.href = "/"


    }
  return (
   
    <Button onClick={logoutFunction}>Logout</Button>
    
  )
}

export default Logout