import React from 'react'
import {useState} from "react"

function AddPost() {
    const [users, setUsersData] = useState({})
  

    const submit = (event)=>{
      event.preventDefault()
      fetch("api/content", {
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
        <h1>Here you can Login</h1>
        <form onSubmit={submit} onChange={handelChange}>
            <textarea name="topic" rows="10" cols="30"></textarea>
            <textarea name="post" rows="10" cols="30"></textarea>
            <textarea name="comment" rows="10" cols="30"></textarea>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default AddPost