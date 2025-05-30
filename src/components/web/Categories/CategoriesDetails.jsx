import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'
import './Categories.css'
import Loader from '../../Shared/Loader.jsx';
import  {avgRating} from '../Review/Ratings.jsx'
export default function CategoriesDetails() {

    const {category}=useParams();

    const getCategoriesDetails = async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${category}`);
    return data;
    }

   const {data,isLoading}=useQuery('category-details',getCategoriesDetails);
   //console.log('D',data)
   if(isLoading){
    return<Loader />
   }
  return (
    <div className='products align-items-center container m-5 '>
{data? data.map((product)=>

        <div className='product row ' key={product.id}>

         <div className='col-md-6 d-flex justify-content-center'>
         <img className='product-sub-img' src={product.image} />
         </div>
         <div className='col-md-6 details'>
         <h4>{product.title}</h4>
         {avgRating(product.rating.rate)}
           <Link className='btn px-4 py-2 mt-4' to={`/product/${product.id}`}>Details </Link>
         </div>
           </div>
        )
        :<p >No Products Found</p>}

</div>
  )
}
