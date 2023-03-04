import React from 'react'
import Button from '@mui/joy/Button';


function Logout() {
    
    //Removes auth token from local storage
    function logoutFunction(){
        localStorage.removeItem("auth_token")
        window.location.href = "/"
    }
  return (
   
    <Button onClick={logoutFunction}>Logout</Button>
    
  )
}

export default Logout