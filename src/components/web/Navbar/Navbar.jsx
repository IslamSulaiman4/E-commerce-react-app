import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../Context/User.jsx';
import { CartContext } from '../Context/FeatureCart.jsx';
import './Navbar.css'




export default function Navbar() {
  let {userToken,setUserToken,userData,setUserData}= useContext(UserContext);
  let {count} = useContext(CartContext);

 // const backgroundColor = { backgroundColor: rgba(0, 0, 0, 0.22) };
//const blur = { backdropFilter: blur(12px)};
 // console.log(userData)
  
let navigate=useNavigate();
const  logout=()=>{
 localStorage.removeItem('userToken');
   setUserToken(null);
   setUserData(null);
   navigate('/');
 }
 

  return (
    <div>     
      <nav className="navbar navbar-expand-lg border-bottom border-dark" >
    <div className="container ">
    <a className="navbar-brand fs-2" href="#">Cartify</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
       
        <li className="nav-item ">
          <Link className="nav-link" to="/">Home</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>


        <li className="nav-item">
        <Link className="nav-link" to="/products">Products</Link>
      </li>
      {userToken? <li className="nav-item">
        <Link className="nav-link" to='/cart'>Cart <span className='badge bg-dark'> {count}</span></Link>
        
      </li>:null}

      </ul>
      <ul className="navbar-nav">

      <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle p-0 d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {userData!=null?
        <div className='userAccount d-flex gap-1 align-items-center justify-content-center '>
          <p className='pt-3 fw-semibold'>{userData.userName }</p> 
          <img src={userData.image.secure_url} />
          </div>:"Account"}
      </a>
      <ul className="dropdown-menu ">
        {userToken==null? <>
        <li><Link className="dropdown-item" to="/login">login</Link></li>
        </>    
: <><li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" onClick={logout}  to="/">logout</Link></li>
                  </>}

        

      </ul>
    </li>
      </ul>
   
    </div>
  </div>
</nav></div>
  )
}
