import React from 'react'
import {Routes, Route} from "react-router-dom"
import Homepage from '../Pages/Homepage'
import SignupCard from '../Pages/Signup'
import SimpleCard from '../Pages/Login'
import ForgetPassword from '../Components/ForgetPassword'
import Blog from '../Pages/Blog'
import UserBlog from '../Pages/UserBlog'


const MainRoutes = () => {
  return (
  <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/register" element={<SignupCard />} />
      <Route path="/login" element={<SimpleCard />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/blog/:blogId" element={<Blog />} />
      <Route path="/blogs/:userId" element={<UserBlog />} />
  </Routes>
   
  )
}

export default MainRoutes