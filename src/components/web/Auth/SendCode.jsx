import React, { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function SendCode() {

let navigate=useNavigate();
const getCode= async(e)=>{
    e.preventDefault();
let email=e.target.form[0].value;

const x= await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, {email});
navigate('/forgetPassword');
}

    
  return (
    <div className='container m-5 text-center d-flex justify-content-center'>
    <div className='w-50 d-felx align-items-center flex-wrap border border-1 rounded rounded-1 p-5'>
    <h2>Enter your Email</h2>
    <form >
        <label htmlFor='uemail'>Email</label>
        <input className='w-50'  id='uemail' type="email" name='email' />
        <button onClick={getCode}>Send</button>
    </form>


    </div>

</div>
  )
}
