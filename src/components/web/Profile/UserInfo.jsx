import React, { useContext } from 'react'
import { UserContext } from '../Context/User.jsx'
import style from './Profile.module.css'

export default function UserInfo() {
    let {userData,loading} =useContext(UserContext);
    console.log(userData)
  
    if(loading){
      return <div>
        Loading ...
      </div>
    }
  return (
    <div className={`${style.userData}`}>
    <div className='user-info'>
      <h2>User name: {userData.userName}</h2>
      <img src={userData.image.secure_url} />
    </div>
    </div>
  )
}
