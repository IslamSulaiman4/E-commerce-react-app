import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function Loader() {
  return (
   
<div className='w-100 d-flex justify-content-center py-5'>
<Circles
  height="80"
  width="80"
  color="black"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
</div>
  )
}
