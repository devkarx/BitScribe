import React from 'react'
import service from '../../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full '>
            <div>
                <img src={service.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2>{title}</h2>

        </div>
    </Link>
  )
}

export default PostCard
