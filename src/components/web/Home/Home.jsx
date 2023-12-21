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
import img from '../../../images/slidertwo.jpg';

import './Home.css'
import Loader from '../../Shared/Loader.jsx';
import AllCategories from '../Categories/AllCategories.jsx';


export default function Home() {
  const styles = {
    backgroundImage:`url(${img})`,
    backgroundSize: "100% 100%",
    height: "100vh",
  };

  
  
   
  
    return (
      <div className='container pt-5 '>
       <AllCategories />

      <div className='m-5' style={styles}>
        <div className='d-flex flex-column justify-content-center align-items-center w-50 h-100 text'>
          <h2>New Collection </h2>
          <p>All in one place!</p>
        </div>

      </div>

      </div>
    )
  }

