import React from 'react'
import { useState, useEffect } from 'react'

//Unfortunetly couldn't figure out how to show comments according to content id
//this works on serverside with postman
//When user click comment button in FetchPost.js this should send the content id here 
//after that it gets the comments from the db if there is any
function FetchComments({id}) {
    const [dataComments, setCommentsData] = useState()
    let url = "api/getContent/:"+{id}
    console.log("fetch comments")

    useEffect(()=> {
        let mounted = true
        async function fetchData(){
          const response = await fetch(url)
          const getData = await response.json()
        
          if(mounted){
            setCommentsData(getData)
          }
        }
        fetchData()
        
        return () =>{
          mounted=false
        }             
    
      },[url])

  return (
    <div>
        {dataComments}
    </div>
  )
}

export default FetchComments

/* 

        {dataComments.map((items)=>(
            <p key={items.id}>
                {items.comment}
            </p>
        ))}
*/