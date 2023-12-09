import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'


export default function CategoriesDetails() {

    const {categoryID}=useParams();


    const getCategoriesDetails = async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryID}`);
        //console.log(data.categories)
    return data.products;
    }
   const {data,isLoading}=useQuery('category-details',getCategoriesDetails);
   if(isLoading){
    return <div>
        Loading ...
    </div>
   }
  return (
    <div className='products'>
        {data.length? data.map((product)=>
        <div className='product' key={product._id}>
         <img src={product.mainImage.secure_url} />
            <h2>{product.name}</h2>
           <Link to={`/product/${product._id}`}>Details </Link>
           </div>
        )
        :<p>No Products Found</p>}

    </div>
  )
}
