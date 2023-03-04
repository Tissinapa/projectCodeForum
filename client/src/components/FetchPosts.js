import React from 'react'
import {useState, useEffect} from 'react'

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



//Fetches all added post from db and shows them in homepage
function FetchPosts() {
    const [data, setData] = useState([])
    const [isShown, setIsShown] = useState(false)
  
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
    
    //Hides the comments and shows them
    //https://bobbyhadz.com/blog/react-onclick-show-component 
    const handelClick = e =>{
      setIsShown(current => !current)
    }

    return (
  
      <div><Typography variant='h1' sx={{fontSize: 45 ,textAlign: 'center',marginTop: 10}} >Questions</Typography>
        {data.map((items)=>(
          <Card key={items._id} value={items._id} sx={{m: 2}}>
            <Typography variant='h1' sx={{fontSize: 25}}>{items.topic} 
            </Typography>
              <div>
                <Typography>{items.post}</Typography>
                <hr>
                </hr>
                <Button size="small" onClick={handelClick}>Comments </Button>
                    {isShown && (
                      <p>{items.comment}</p>
                    )}
              </div>
          </Card>
        ))}
      </div>        

    )
 }
export default FetchPosts

 


/* { <Button size="small" onClick={()=>
<FetchComments comId = {items._id}/>} >Comments </Button> */ 




