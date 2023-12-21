import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader.jsx';
import style from './Profile.module.css' 
import { UserContext } from '../Context/User.jsx';


export default function GetOrders() {

    const {getOrderContext}=useContext(UserContext);

    const getOrder=async()=>{
        const res=await getOrderContext();
        return res;
    }

const {data,isLoading}=useQuery('order',getOrder);

const yourProducts=(orderId)=>{
    const order =data.orders.find((order) => order._id === orderId);
    if (!order) {
        return <div>No order found for the provided ID.</div>;
      }
    return (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Show Products
          </button>
  
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Products</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      {order.products?order.products.map((product)=>
                      <div className="col-md-4" key={product.productId}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Product code {product.productId}</h5>
                            <p className="card-text">Price: ${product.unitPrice}</p>
                            <p className="card-text">Quantity: {product.quantity}</p>
                            <p className="card-text">SubTotal: ${product.finalPrice}</p>
                          </div>
                        </div>
                      </div>
                    ):'No Products'}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    


    if(isLoading){ return <Loader />}
  return (
    <div className='container'>
        <div className='row'>
            <h1>Orders List</h1>
            {data?.orders?(data.orders.map((order)=>
                <div className='col-md-6 background container mb-2 p-1 d-flex  align-items-center h-100vh' key={order._id}>
                <div className='w-100 '>
                <div className={`${style.order}`} key={order._id}>
                    <ul>
                    <h2 className=''>Order {order._id}    </h2>              
                    <li> <h3>Order status: {order.status}</h3></li>
                    <li><h3>Payment type: {order.paymentType}</h3></li>
                    <li><h3>Total price: ${order.finalPrice}</h3></li>
                    <li><h3>Created at: {new Date(order.createdAt).toLocaleDateString()}</h3></li>
                    <li><h3>{order.couponName?'Coupon name:'`${order.couponName}`:"NO cpoupon used"}</h3></li>
                    <li >{yourProducts(order._id)}</li>
                     </ul>
                </div>
</div>
</div>
            )):<h2>No orders to show !</h2>

            

            }
        </div>
 
    </div>
  )
}
