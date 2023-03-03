import React from 'react'
import {useState, useEffect} from 'react'


function FetchPosts() {
    const [data, setData] = useState([])

    useEffect(()=> {
      let mounted = true
      async function fetchData(){
        const response = await fetch("")
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
          <ul key={items.id}>
            {items.title}
          </ul>
        ))}
      </div>
    )
 }
export default FetchPosts