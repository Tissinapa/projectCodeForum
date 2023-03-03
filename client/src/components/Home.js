import React from 'react'
import AddPost from './AddPost'
import FetchPosts from './FetchPosts'

function Home() {
  return (
    <div>
        <h1>Homepage</h1>
        <p>Add stackOverFlow look here</p>
        <AddPost></AddPost>
        <FetchPosts></FetchPosts>
    </div>
  )
}

export default Home