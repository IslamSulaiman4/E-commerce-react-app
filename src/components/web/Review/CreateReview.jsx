import { useFormik } from 'formik';
import React from 'react'
import Input from '../../Shared/Input.jsx';
import axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';

export default function CreateReview() {
    
    const Navigate =useNavigate();
  const { productID } = useParams();
    const initialValues={
        comment:'',
        rating:'',
    }
    const onSubmit=async (review)=>{
        const token=localStorage.getItem('userToken');
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/products/${productID}/review`,review,
        {headers:{Authorization:`Tariq__${token}`}});

             if(data.message=='success'){
                 Navigate('/');
                 toast.success('Your Review Added Successfully!', {
                     position: "top-right",
                     autoClose: 4000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "dark",
                     });}}
                    

         const formic= useFormik({
            initialValues,
            onSubmit,
    
        })

        const reviwInputs=[

            {
                name:'comment',
                id:'comment',
                type:'comment',
                title:'Comment',    
                value:formic.values.comment,
            },
            {
                name:'rating',
                id:'rating',
                type:'rating',
                title:'Rating',
                value:formic.values.rating,
            },
    
        ];

        const renderInputs=reviwInputs.map((input,index)=>
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


  return (
    <div>
           <form className='pt-5' onSubmit={formic.handleSubmit} >
           <h2 className='text-start'>Add Your Review !</h2>

        {renderInputs}


        <button className='btn' type='submit' disabled={!formic.isValid}>Submit</button>

        </form>
    </div>
  )
}
