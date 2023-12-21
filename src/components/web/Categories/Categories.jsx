import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
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
import Loader from '../../Shared/Loader.jsx';
import { UserContext } from '../Context/User.jsx';
import AllCategories from './AllCategories.jsx';


export default function Categories() {

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [data, setData] = useState(null);
  let {userToken} =useContext(UserContext);


    const getCatigories= async (page)=>{
      setLoading(true);
      try{
        const token=localStorage.getItem('userToken');
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=${page}&limit=3`,
        {headers:{Authorization:`Tariq__${token}`}},
        {params:{page,limit}});
        setData(data);
        setLoading(false);
      }
      catch(error){
        console.log(error);
        setLoading(false);
      }
    }
  


  useEffect(() => {
    getCatigories(page);
  }, [page]);

  const handlePageClick = (pageNumber,limit) => {
    setPage(pageNumber);
    setLimit(limit);
  };

  const PaginationF = () => {
    const limit=4;
    const pageNumber =9/3;
    const pages = [];

    for (let i = 1; i <= pageNumber; i++) {
      pages.push(
        <li key={i} className="page-item">
          <a
            className="page-link text-dark"
            href=''
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i,limit);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    return <ul className="pagination mt-5">{pages}</ul>;
  };

    if(loading){
  return <Loader />
    }
  
    return (
      <div className='container pt-5'>
  <div className='swiper-custom-pagination'></div>
     <AllCategories/>

      <div className=" m-5">
      <div className="row">
        {loading ? (<Loader />) : data?.categories?data.categories.map( (category)=> (
            <div className="col-md-4 p-1 all-products" key={category._id}>
              <Link to={`/products/category/${category._id}`}>
              <img src={category.image.secure_url} alt='category photos' />
              <p>{category.name}</p>
              </Link>
            </div>
            
          ))
         : (
          'No Category found'
        )}
        <nav aria-label="Page navigation example">
<ul className="pagination d-flex justify-content-center">
{PaginationF()}
</ul>
</nav>
      </div>

      </div>
</div>
  )
}
