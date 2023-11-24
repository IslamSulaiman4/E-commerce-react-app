import React from 'react'


export default function Input({id,type,title,name,onChangef,value,errors,onBlur,touched}) {
  return (
    <>

<div className='input-group p-3 '>
    <label className='me-2 p-3 border border-1' htmlFor={id}>{title}</label>
    <input className='form-control w-75 ' type={type} name={name} id={id} value={value} onChange={onChangef} onBlur={onBlur}/>
    {touched[name]&&errors[name]&&<p className='text text-danger d-block'>{errors[name]}</p>}
    </div>        
    </>
  )
}
