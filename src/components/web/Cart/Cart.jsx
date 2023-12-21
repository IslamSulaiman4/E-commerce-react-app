import React, { useContext, useEffect, useState } from 'react'

import { CartContext } from '../Context/FeatureCart.jsx'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../Shared/Loader.jsx';
import './Cart.css'

export default function Cart() {
    const {getCartContext,removeItemContext,clearCartContext}= useContext(CartContext);
    const [loading,setLoading]=useState(false);
    let [subTotal, setSubTotal] = useState(0);

    const getCart= async()=>{
      setLoading(true);
        const res= await getCartContext();
        setLoading(false);
        return res;

    }
    const {data,isLoading} =useQuery("cart",getCart);
useEffect(() => {
  let total = 0;
  if (data?.products) {
    data.products.forEach((product) => {
      total += product.details.price * product.quantity;
    });
  }
  setSubTotal(total);
}, [data]);
    const removeItem =async (productID)=>{
      setLoading(true);
        const res= await removeItemContext(productID);
        return res;
      
    }

    const clearCart= async()=>{
      setLoading(true);
      const res=await clearCartContext();
     return res;

    }

    const decreaseQuantity = async (productID)=>{
      setLoading(true);
      const token=localStorage.getItem('userToken');
      const {data} =await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId:productID},{
        headers:{Authorization:`Tariq__${token}`}})
        console.log(data)
        return data.cart;
      
  }

  const increaseQuantity = async (productID)=>{
    setLoading(true);
    const token=localStorage.getItem('userToken');
    const {data} =await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId:productID},{
      headers:{Authorization:`Tariq__${token}`}})
      console.log(data)
      return data.cart;
    
}

    if(isLoading==true)
        return
        <Loader />
    
  return (
    <div className="cart ">
    <div className="container">

      <div className="row g-1">

        <div className=" cart-items pt-2">

          <div className=" products pt-5" id="products">

            <div className="item">
              <div className="product-info">
                <h2>Product</h2>
              </div>
              <div className="quantity">
                <h2>Quantity</h2>
              </div>
              <div className="price">
                <h2>Price</h2>
              </div>
              <div className="subtotal">
                <h2>Subtotal</h2>
              </div>
            </div>
            {loading? <Loader />:data?.products.length>0?(data.products.map((product)=>
                    <div className="item cart-item pb-2 " key={product._id}>
                    <div className="product-info  ">
                    {loading?(<Loader />):
                        <a className='remove' href="#" onClick={()=>removeItem(product.details._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={25}
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z"
                            fill="#6C7275"
                          />
                        </svg>
                      </a>}
                      <img src={product.details.mainImage.secure_url} />
                      <div className="product-details">
                        <h2 className='name'>{product.details.name}</h2>
                      </div>
                    </div>
                    <div className="quantity">
                      <button onClick={()=>decreaseQuantity(product.details._id)}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={17}
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M3.22852 8.5H12.5618"
                            stroke="#121212"
                            strokeWidth="0.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {loading?<Loader />:product.quantity>0?<span>{product.quantity}</span> :data.products.find(()=>removeItem(product.details._id)
                     )}
                      <button onClick={()=>increaseQuantity(product.details._id)}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={17}
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
                            fill="#121212"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="price">${product.details.price}</div>
                    <div className="subtotal">${product.details.price*product.quantity}</div>

                  </div>
            )
            ):
            <h2>Cart is empty</h2>}

          </div>

          </div>
        </div>

<div className='cart-total py-3'>
  <h2>Cart Total</h2>
  <div className='summary  pt-2 pb-1'>
    <p>SubTotal</p>
    <span>${subTotal}</span>
  </div>
  <div className='summary pt-2 pb-1'>
    <p>Shipping</p>
    <span>+$15.00</span>
  </div>
  <div className='summary pt-2 pb-1'>
    <p>Total</p>
    <span>${subTotal+15}</span>
  </div>

</div>

<div className='d-flex justify-content-evenly'>
             
               {data?.products.length>0? <Link className='cart-btns btn' to="/order">Chekout</Link>:null}           
             
              {data?.products?<button className=' m-0 cart-btns btn' onClick={clearCart}>
          Clear Cart</button>:null }
              
</div>


      </div>
    </div>


  )
}
