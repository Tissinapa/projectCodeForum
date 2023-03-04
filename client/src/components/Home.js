import React from 'react'
import AddPost from './AddPost'
import FetchPosts from './FetchPosts'


//Just a home page where calls 
//fetchposts and addpost components

function Home() {
  return (
    <div>
         
        <FetchPosts></FetchPosts>
        <AddPost></AddPost>
        
    </div>
  )
}

export default Home