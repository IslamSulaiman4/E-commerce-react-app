import React, { useContext } from 'react'
import Input from '../../Shared/Input.jsx'
import {LoginSchema } from '../Validation/Validate.jsx';
import { useFormik} from 'formik';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/User.jsx';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader.jsx';
import './Auth.css'

export default function Login() {
    const navigate=useNavigate();
    const {loading} =useQuery();
    let {userToken,setUserToken} =useContext(UserContext);
    if(userToken){
navigate(-1);
    }

 
    
    const initialValues={
        email:'',
        password:'',
    }
    const onSubmit=async users=>{
   const {data}=await axios.post(' https://ecommerce-node4.vercel.app/auth/signin',users);
        if(data.message=='success'){
            localStorage.setItem("userToken",data.token);
            setUserToken(data.token);
            navigate('/');
            toast.success('Login Successfully!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });

    }}

    const formic= useFormik({
        initialValues,
        onSubmit,
        validationSchema:LoginSchema

    });
    const inputs=[

        {
            name:'email',
            id:'email',
            type:'email',
            title:'User email',    
            value:formic.values.email,
        },
        {
            name:'password',
            id:'password',
            type:'password',
            title:'password',
            value:formic.values.password,
        },

    ];
    const renderInputs=inputs.map((input,index)=>
    <Input
     type={input.type} 
     id={input.id}
      title={input.title} 
      name={input.name}
       key={index } 
       value={input.value}
       onChangef={formic.handleChange}
       errors={formic.errors}
       onBlur={formic.handleBlur}
       touched={formic.touched}
       />
    )

    if(loading){
        return <Loader />
    }
  return (
    <div className='container m-5 text-center d-flex justify-content-center'>
        <div className='auth-Form w-75 d-felx align-items-center flex-wrap border border-1 rounded rounded-1 p-5'>
        <h2>Sign in</h2>
        <form onSubmit={formic.handleSubmit} >
        {renderInputs}
        <div className=' d-flex flex-column  align-items-center gap-4 pt-4'>
        <button className='btn' type='submit' disabled={!formic.isValid}>Log in</button>
         <Link className='btn' to='/sendCode'>Forget Password</Link>
        </div>

        </form>

        </div>

    </div>
  )
  }
