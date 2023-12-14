import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

export default function GetOrders() {
    const [loading,setLoading]=useState(true);

    const getOrder= async()=>{
        const token=localStorage.getItem('userToken');
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        {headers:{Authorization:`Tariq__${token}`}});
        setLoading(false);
        console.log(data);
        console.log(data);
        return data
    }
    
    const {data,isLoading} =useQuery("orders",getOrder);
 
    if(isLoading){ return <p> Loading ...</p>}
  return (
    <div className='container'>
        <div className='row'>
            <h1>Orders List</h1>
            {data?.orders?(data.orders.map((order)=>
                
                <div className="order" key={order._id}>
                    <ul>
                    <h2>Order ID: {order._id}    </h2>              
                    <li> <h3>Order status: {order.status}</h3></li>
                    <li><h3>Payment type: {order.paymentType}</h3></li>
                    <li><h3>Total price: {order.finalPrice}</h3></li>
                    <li><h3>Created at: {new Date(order.createdAt).toLocaleDateString()}</h3></li>
                    </ul>
                    <div><p>-----------------------</p></div>
                </div>

            )):<h2>No orders to show !</h2>

            

            }
        </div>
 
    </div>
  )
}
