import React from 'react'
import {Logo,LogoutBtn, Container} from "../index"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../../appwrite/auth'

function Header() {
  const navigate = useNavigate()
  const authStatus= useSelector((status)=>{state,auth.status} )
  const navItems=[
    {
      name: "Home",
      slug:"/",
      active: true,
    },
    {
      name: "Login",
      slug:"/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug:"/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug:"/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug:"/add-post",
      active: authStatus,
    }
  ]
  return (
    <header>
      <Container>
        <nav>
          <div>
          <Link to="/"><Logo /></Link>
          </div>
          <ul>
            {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=>{item.slug}}>{item.name}</button>
                </li>
              ): null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
