import React from 'react'
import {useState} from "react"
import Textarea from '@mui/joy/Textarea';


function AddPost() {
    const [content, setContentData] = useState({})
    

    const submit = (event)=>{
        
      event.preventDefault()
      fetch("api/content", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "authorization": "Bearer " + localStorage.getItem('auth_token')
        },
        body: JSON.stringify(content),
        mode: "cors"
      })
  
    }

  const handelChange = (event) =>{
    setContentData({...content, [event.target.name]: event.target.value}) 
   }
  return (
    <div>
        <h1>Here you can Post stuff</h1>
        <form onSubmit={submit} onChange={handelChange}>
            <Textarea name="topic" rows="10" cols="30" placeholder="Topic"></Textarea>
            <textarea name="post" rows="10" cols="30" placeholder="Post"></textarea>
            <textarea name="comment" rows="10" cols="30" placeholder="Comment"></textarea>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default AddPost