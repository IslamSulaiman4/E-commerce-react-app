import React, { useContext } from 'react'
import Input from '../../Shared/Input.jsx'
import { registerSchema } from '../Validation/Validate.jsx';
import { useFormik, validateYupSchema } from 'formik';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useQuery } from 'react-query';

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
                theme: "light",
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
        return <div>
            Loading ...
        </div>
    }
  return (
    <div className='container m-5 text-center d-flex justify-content-center'>
        <div className='w-50 d-felx align-items-center flex-wrap border border-1 rounded rounded-1 p-5'>
        <h2>Create Account</h2>
        <form onSubmit={formic.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button type='submit' disabled={!formic.isValid}>Sign up</button>
        </form>

        </div>

    </div>
  )
  }
