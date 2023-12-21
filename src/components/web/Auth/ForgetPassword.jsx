import React from 'react'
import Input from '../../Shared/Input.jsx'
import { useFormik } from 'formik';
import {ForgetPasswordSchema} from '../Validation/Validate.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader.jsx';

export default function ForgetPassword() {
    const {loading} =useQuery();
    let navigate=useNavigate();
    const initialValues={
        email:'',
        password:'',
        code:''
    }

    const onSubmit=async users=>{
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users);
        if(data.message=='success'){
            toast.success('Your Password Changed Successfully!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });}
                navigate('/login');
 }
    const formic= useFormik({
        initialValues,
       onSubmit,
        validationSchema:ForgetPasswordSchema

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
            title:'Password',
            value:formic.values.password,
        },
        {
            name:'code',
            id:'code',
            type:'text',
            title:'Code',
            value:formic.values.code,
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
        <h2>Reset Password</h2>
        <form className='' onSubmit={formic.handleSubmit}>
        {renderInputs}
        <button className='btn' type='submit' disabled={!formic.isValid}>Reset</button>
        </form>

    
        </div>
    
    </div>
      )
    }
    
