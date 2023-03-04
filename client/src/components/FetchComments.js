import React from 'react'
import { useState, useEffect } from 'react'

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