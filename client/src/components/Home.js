import React from 'react'
import AddPost from './AddPost'
import FetchPosts from './FetchPosts'



function Home() {
  return (
    <div>
         
        <FetchPosts></FetchPosts>
        <AddPost></AddPost>
        
    </div>
  )
}

export default Home