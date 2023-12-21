import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../Context/User.jsx'
import style from './Profile.module.css';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../../Shared/Loader.jsx';


export default function Profile() {
  let {userData,loading} =useContext(UserContext);
  //console.log(userData)

  if(loading){
    return <Loader />
  }
  return (
    <aside className={`${style.profile}`}>
      <div className={`${style.profileLinks}`}>
        <nav>
          <Link className='mt-3 ' to='/profile'>info</Link>
          <Link className='' to='/profile/contact'>contact</Link>
          <Link className='' to='/profile/order'>Orders</Link>
        </nav>

      </div>




<div>
  <Outlet />
</div>




    </aside>

  )
}
