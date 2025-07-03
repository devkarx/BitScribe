import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts().then((posts)=>{
          if (posts) {
              setPosts(posts.documents)
          }
        })
        
    }, [])
    
    if(posts.length === 0){
      <div >
          <Container>
              <h1>Login to read Posts</h1>
          </Container>
      </div>
    }  

  return (
    <div className="w-full">
        <Container>
            <div className="flex">
                {posts.map((post)=>{
                    <div key={post.$id} className="p-2">
                        <PostCard {...post} />
                    </div>
                })}
            </div>
        </Container>
    </div>
  )
  
}

export default Home

