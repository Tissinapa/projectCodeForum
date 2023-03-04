import React from 'react'
import {useState} from "react"
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';


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
        <Typography level="h1" sx={{ textAlign: 'center' ,fontWeight: 'bold', fontSize: 40}}>Ask question</Typography>
        <form onSubmit={submit} onChange={handelChange}>
            <Textarea name="topic" rows="10" cols="30" placeholder="Topic" size="md" sx={{m: 2}}></Textarea>
            <Textarea name="post" rows="10" cols="30" placeholder="Post" size="lg" sx={{m: 2}}></Textarea>
            <Textarea name="comment" rows="10" cols="30" placeholder="Comment" size="md" sx={{m: 2}}></Textarea>
            <Input type="submit" value="Submit" size="md" sx={{m: 2}}/>
        </form>
    </div>
  )
}

export default AddPost