import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../Context/User.jsx'
import { useQuery } from 'react-query';


export default function Profile() {
  let {userData} =useContext(UserContext);







  return (
    <div className='container m-5  d-flex justify-content-center'>
    <div className='w-50 d-felx align-items-center flex-wrap border border-1 rounded rounded-1 p-5'>
    <form >
<div >
  <h2 className='border border-2 p-2 text-center '>Profile Information</h2>
  </div>
  <div className='mt-4 d-flex flex-column align-items-start'>
  <h3>Name :{userData.user.userName}</h3>
  <h3>Email: {userData.user.email}</h3>
  <div className='mt-4 d-flex gap-4'>
  <h3 >Image</h3>
  <img  src={userData.user.image.secure_url} />
  </div>

  </div>  
    </form>
    </div>
</div>
  )
}
