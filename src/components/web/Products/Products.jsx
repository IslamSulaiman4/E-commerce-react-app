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

  const initialValues={
    fPrice:'',
    sPrice:'',
}


const formic= useFormik({
  initialValues,

});

const inputs=[
  {
      name:'fPrice',
      id:'fPrice',
      type:'fPrice',
      title:'From',
      value:formic.values.fPrice,
  },
  {
      name:'sPrice',
      id:'sPrice',
      type:'sPrice',
      title:'To',
      value:formic.values.sPrice,
  },]

  const renderInputs=inputs.map((input,index)=>
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


const onSubmit = () => {
  const { fPrice, sPrice } = formic.values;
  filter(fPrice, sPrice);
};
const filter = (fPrice, sPrice) => {
  getFilteredProducts(fPrice, sPrice);
};
const getFilteredProducts = async (fPrice, sPrice) => {
  setLoading(true);
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?price[gte]=${fPrice}&price[lte]=${sPrice}`,
      );
     
    setData(data);
    setLoading(false);
  }
   catch (error) {
    console.error('Error');
    setLoading(false);
  }}



  const getProducts = async (currentPage) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?fields=name,mainImage,_id,avgRating,price&page=${currentPage}`,
        );
       
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
        `${import.meta.env.VITE_API_URL}/products?fields=name,mainImage,_id,avgRating,price&sort=${sortType}&limit=8`,
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
  const getProductsSearchedFor= async (search) => {
console.log(search);
setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?fields=name,mainImage,_id,avgRating,price&search=${search}&limit=8`,
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

  useEffect(() => {
    getProducts(page);
  }, [page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };
  
  const sort=(type)=>{
    
    getProductsSorted(type)   
  }

  const search=(product)=>{
    
    getProductsSearchedFor(product)   
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const Pagination = () => {

    const pageNumber = Math.ceil(data.total / data.page);
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
      <div className='py-0 d-flex text-center justify-content-center align-items-center'>
      <div className="sidebar">
      <div className="d-flex flex-column p-3 filter align-items-center justify-content-center" style={{ width: '280px' }}>
        <div className="dropdown w-100">
          <a href="/" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle justify-content-center" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </a>
          <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li className=''>
              <div>
              <div className=''>{renderInputs}</div>
              <div className='text-center'><button className='btn w-25 ' onClick={onSubmit}>ok</button></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="dropdown py-3 w-50">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
    Sort
  </button>
  <ul className=" dropdown-menu" aria-labelledby="dropdownMenu2">
  <li><button className="dropdown-item" type="button" onClick={()=>sort('name')}>Name (A-Z)</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>sort('-name')}>Name (Z-A)</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>sort('price')}>Price (Least fisrt)</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>sort('-price')}>Price (Highest fisrt)</button></li>
  </ul>
</div>
<div className='search w-50'>
  <input className='border-dark py-1' type="text" value={inputValue} onChange={handleInputChange}/>
  <button className='bttn pt-1 ms-1' onClick={()=>search(inputValue)}> <IoSearchCircle /> </button>

  </div>
  </div>
     

 
      <div className="row ">
        {loading ? (<Loader /> ) : data?.products ? ( data.products.map((product) => (
            <div className="col-md-6 p-1 all-products" key={product._id}>
              <Link to={`/product/${product._id}` }>
              <img src={product.mainImage.secure_url} alt='product image' />
              <p>{product.name}</p>
             {avgRating(product.avgRating)}
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
