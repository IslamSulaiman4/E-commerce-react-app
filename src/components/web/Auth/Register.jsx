import React, { useContext } from 'react'
import Input from '../../Shared/Input.jsx'
import { registerSchema } from '../Validation/Validate.jsx';
import { useFormik, validateYupSchema } from 'formik';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader.jsx';
import './Auth.css'
import { Link } from 'react-router-dom';

export default function Register() {
    const {loading} =useQuery();

    const initialValues={
        userName:'',
        email:'',
        password:'',
        image:null,
    }
    const onSubmit=async users=>{
        const formData =new FormData();
        formData.append("userName",users.userName);
        formData.append("email",users.email);
        formData.append("password",users.password);
        formData.append("image",users.image);

        const {data}=await axios.post(' https://ecommerce-node4.vercel.app/auth/signup',formData);
        if(data.message=='success'){
            toast.success('Account created successfully! please verify your email to login', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    }}

    const handleFieldChange= (event)=>{
        formic.setFieldValue('image',event.target.files[0]);
    }
    const formic= useFormik({
        initialValues,
        onSubmit,
        validationSchema:registerSchema

    });
    const inputs=[
        {
            name:'userName',
            id:'name',
            type:'text',
            title:'User name',
            value:formic.values.userName,
        },
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
        {
            name:'image',
            id:'image',
            type:'file',
            title:'User image',
            onChange:handleFieldChange
        }
    ];
    const renderInputs=inputs.map((input,index)=>
    <Input
     type={input.type} 
     id={input.id}
      title={input.title} 
      name={input.name}
       key={index } 
       value={input.value}
       onChangef={input.onChange ||formic.handleChange}
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
        <div className='auth-Form w-75 d-felx align-items-center flex-wrap  p-5'>
        <h2 className=' fw-bold '>Create Account</h2>
        <form onSubmit={formic.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button className='mt-2 btn' type='submit' disabled={!formic.isValid}>Sign up</button>
        <h4 className='mt-4 '>Have an account?</h4>
        <Link className='btn' to='/login'> Sign in</Link>
        </form>

        </div>

    </div>
  )
  }
