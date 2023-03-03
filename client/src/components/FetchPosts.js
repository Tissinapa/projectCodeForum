import React from 'react'
import {useState, useEffect} from 'react'


function FetchPosts() {
    const [data, setData] = useState([])

    useEffect(()=> {
      let mounted = true
      async function fetchData(){
        const response = await fetch("api/getContent")
        const getData = await response.json()
      
        if(mounted){
          setData(getData)
        }
      }
      fetchData()
      
      return () =>{
        mounted=false
      }             
  
    },[])
    
    return (
  
      <div>
        <h1>About to fetch something</h1>
        {data.map((items)=>(
          <ul key={items.Topic}>
            {items.Topic}
            {items.post} <br></br>
            {items.comment}
          </ul>
        ))}
      </div>
    )
 }
export default FetchPosts