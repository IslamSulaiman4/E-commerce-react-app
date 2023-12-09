import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './Categories.css'


export default function Categories() {

  const getCatigories= async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=6`);
    //console.log(data);

    return data;
  }

  const {data,isLoading}= useQuery('web_categories',getCatigories);

  if(isLoading){
return <div> isLoading ...</div>
  }

  return (
    <div className='container'>
<div className='swiper-custom-pagination'></div>
    <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={50}
    slidesPerView={7.6}
    navigation
    loop={true}
    autoplay={{delay:1000}}
    pagination={{ clickable: true,
    el:'swiper-custom-pagination' }}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >

 {data?.categories.length?data ?.categories.map( (category)=>
  <SwiperSlide key={category._id}>

<Link to={`/products/category/${category._id}`}>
<div className="category">
  <img src={category.image.secure_url} />
  </div>  
</Link>

  </SwiperSlide>   
   ):<p>No Categories Found</p>}


    </Swiper>

    </div>
  )
}
