import React, { useContext } from 'react'
import { UserContext } from '../Context/User.jsx'
import style from './Profile.module.css'

export default function Contact() {
    let {userData,loading} =useContext(UserContext);
    console.log(userData)
  
    if(loading){
      return <div>
        Loading ...
      </div>
    }
  return (
      
    <div className={`${style.userData}`}>
    <div className='user-contact'>
      <h2>Email: {userData.email}</h2>
    </div>
    </div>
  )
}
