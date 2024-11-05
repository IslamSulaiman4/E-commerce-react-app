import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './Categories.css'
import Loader from '../../Shared/Loader.jsx';
import AllCategories from './AllCategories.jsx';


export default function Categories() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);


    const getCatigories= async (page)=>{
      setLoading(true);
      try{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/categories`);
        setData(data);
        setLoading(false);

      }
      catch(error){
        console.log(error);
        setLoading(false);
      }
    }
  


  useEffect(() => {
    getCatigories();
  }, []);



    if(loading){
  return <Loader />
    }
  
    return (
      <div className='container pt-5'>
  <div className='swiper-custom-pagination'></div>
     <AllCategories/>

      <div className="d-flex justify-content-center m-5 text-center">
      <div className="row-column w-25 ">
        {loading ? (<Loader />):data?data.map( (category)=> (
            <div className="border-bottom  p-3 products" key={category.id}>
              <Link to={`/products/category/${category}`}>
              <p className='fs-4'>{category}</p>
              </Link>
            </div>
            
          ))
         : (
          'No Category found'
        )}

      </div>

      </div>
</div>
  )
}
