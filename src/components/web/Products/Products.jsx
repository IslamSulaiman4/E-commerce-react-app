import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../Shared/Loader.jsx';
import  {avgRating} from '../Review/Ratings.jsx'
import { Link } from 'react-router-dom';
import { IoSearchCircle } from "react-icons/io5";
import { useFormik } from 'formik';
import Input from '../../Shared/Input.jsx';

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');






  const getProducts = async (currentPage) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${currentPage}`,
        );
       console.log(data);
      setData(data);
      setLoading(false);
    }
     catch (error) {
      console.error('Error');
      setLoading(false);
    }
  };

  const getProductsSorted = async (sortType) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?sort=${sortType}`,
        );
       //console.log(data);
       setData(data)
      setLoading(false);
      
    }
     catch (error) {
      console.error('Error');
      setLoading(false);
    }
  };

  const sort=(type)=>{
    
    getProductsSorted(type)   
  }
  useEffect(() => {
    getProducts(page);
  }, [page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };
  


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const Pagination = () => {

    const pageNumber = Math.ceil(data.length / data.page);
    const pages = [];

    for (let i = 1; i <= pageNumber; i++) {
      pages.push(
        <li key={i} className="page-item">
          <a
            className="page-link text-dark"
            href={`/products?page=${i}`}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </a>
        </li>
       );
    }

    return <ul className="pagination mt-5">{pages}</ul>;
  };
  if(loading){return <Loader />}
  return (
    <div className="container m-5 ">
      <div className='d-flex text-center justify-content-center align-items-center mb-2'>

<div className='w-50'>
  <h2>All Products</h2>
</div>
      <div className="dropdown py-3 w-50">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
    Sort
  </button>
  <ul className=" dropdown-menu" aria-labelledby="dropdownMenu2">
  <li><button className="dropdown-item" type="button" onClick={()=>sort('asc')}>Ascending</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>sort('desc')}>Descending</button></li>
  </ul>
</div>

  </div>
     

 
      <div className="row ">
        {loading ? (<Loader /> ) : data? ( data.map((product) => (
            <div className="col-md-6 p-1 all-products" key={product.id}>
              <Link to={`/product/${product.id}` }>
              <img src={product.image} alt='product image' />
              <p>{product.title}</p>
             {avgRating(product.rating.rate)}
              <p>${product.price}</p>
            </Link>
            </div>
          ))
        ) : (
          'No Products found'
        )}
      </div>
      <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
        {Pagination()}
          </ul>
        </nav>
        </div>
  );
}
