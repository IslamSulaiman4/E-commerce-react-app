import React, { useContext } from 'react'
import Input from '../../Shared/Input.jsx'
import { useFormik} from 'formik';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/User.jsx';
import { SendCodeSchema } from '../Validation/Validate.jsx';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader.jsx';

export default function SendCode() {
    const navigate=useNavigate();
    const {loading} =useQuery();


    const initialValues={
        email:'',
    }

    const onSubmit=async users=>{
   const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,users);
   if(data.message=='success'){
    toast.success('Your code sended Successfully!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        }
        navigate('/forgetPassword');
    }

    const formic= useFormik({
        initialValues,
        onSubmit,
        validationSchema:SendCodeSchema

    });
    const inputs=[

        {
            name:'email',
            id:'email',
            type:'email',
            title:'User email',    
            value:formic.values.email,
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
        <h2>Send Code</h2>
        <form className='' onSubmit={formic.handleSubmit} >
        {renderInputs}
        <div className='d-flex flex-column  align-items-center gap-4 pt-4'>
        <button className='btn' type='submit' disabled={!formic.isValid}>Send</button>
        </div>

        </form>

        </div>

    </div>
  )
  }
