import React, { useContext } from 'react'
import { UserContext } from '../Context/User.jsx'
import style from './Profile.module.css'
import Loader from '../../Shared/Loader.jsx';

export default function Contact() {
    let {userData,loading} =useContext(UserContext);
    console.log(userData)
  
    if(loading){
      return <Loader />
    }
  return (
      
    <div className='background container p-2 m-5 text-center d-flex justify-content-center align-items-center border border-1  border-black'>
<div className='w-100  d-felx align-items-center justify-content-center flex-wrap border border-1  border-black p-5'>
    <div className={`${style.userData}`}>
    <div className='user-contact'>
      <h2>Email: {userData.email}</h2>
    </div>
    </div>
    </div>
    </div>

  )
}
