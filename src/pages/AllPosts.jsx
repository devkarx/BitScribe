import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts)=>{
            console.log("received posts", posts)
            if (posts.total) {
                setPosts(posts.documents)
            }
        })
    }, [])

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <Container>
        {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <div key={index}>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-3xl font-bold py-6 text-gray-300">No posts found.</p>
        )}
      </Container>
    </div>
  )
}

export default AllPosts