import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await service.getFilePreview(post.featuredImage)
      console.log("urlll", url)
      if (url) {
        setImageUrl(url);
      }
    }

    fetchUrl();
    
  }, [])


  console.log("title", post)
  return (
    
    <Link to={`/post/${post.$id}`}>

        <div className='w-full bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-200'>
            <div>
                {post.featuredImage ? (
                    <img src={imageUrl} alt={post.title} className='w-full h-48 object-cover' />
                ) : (
                    <div className='w-full h-48 bg-gray-700 flex items-center justify-center'>
                        <span className='text-gray-400'>No Image</span>
                    </div>
                )}
            </div>
            <h2 className='text-white p-4 text-lg font-medium'>{post.title}</h2>
  
        </div>
    </Link>
  )
}

export default PostCard