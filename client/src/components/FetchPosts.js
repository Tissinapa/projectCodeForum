import React from 'react'
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import FetchComments from './FetchComments';
//import CenterFocusWeak from '@mui/icons-material/CenterFocusWeak';



function FetchPosts() {
    const [data, setData] = useState([])
    //const [dataComments, setCommentsData] = useState([])
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

/* 
        {data.map((items)=>(
          <ul key={items}>
            
            Topic {items.topic}<br></br>
            Post {items.post} <br></br>
            Comment {items.comment}
          </ul>
          
        ))}

                            <Button size="small" onClick={()=>
                    <FetchComments comId = {items._id}/>} >Comments </Button>

                  <Button size="small" onClick={handelClick}>Comments </Button>
                    {isShown && (
                      <p>{items.comment}</p>
                    )}
*/

/* 
      <div>Questions
        
        {data.map((items)=>(
          <div>Topic
            <h3 >{items.topic}</h3>
              <div>Post
                <h4>{items.post}</h4>

              </div>
          </div>
        ))}
      </div>


*/
/* 
      <div>Questions
        <div>
          {topics}
        </div>
  
      </div>
*/

/* 
        {data.map((items)=>(
          <Card key={items._id} value={items._id}>Topic
            <Typography>{items._id}</Typography>
            <Typography >{items.topic} <button onClick={likePost}>{count}Like</button>
            </Typography>
              <div>Post
                <Typography>{items.post}</Typography>
                  
                <Button size="small" onClick={handelClick}>Comments </Button>
                    {isShown && (
                      <p>{items.comment}</p>
                    )}
                 
                  
              </div>
          </Card>
        ))}
      </div>
       */