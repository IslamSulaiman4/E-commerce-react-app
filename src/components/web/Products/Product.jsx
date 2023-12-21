import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../Context/FeatureCart.jsx";
import Loader from "../../Shared/Loader.jsx";
import { UserContext } from "../Context/User.jsx";
import  {ratings,avgRating} from '../Review/Ratings.jsx'
import "./Product.css";
import CreateReview from "../Review/CreateReview.jsx";

export default function Products() {
  const { addToCartContext } = useContext(CartContext);
  const { userToken,order} = useContext(UserContext);
  const { productID } = useParams();



  const getProduct = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productID}`
    );
    return data;
  };


  const { data, isLoading } = useQuery("product_details", getProduct);

  const addtoCart = async (productID) => {
    const res = await addToCartContext(productID);

    return res;
  };

console.log(data)


  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container m-5 productD">
      <h2 className="fw-bold py-3">Product Details</h2>
      
       
          <div className="product-img d-flex justify-content-center align-items-center gap-5">
            {data.product.subImages.map((img, index) => (
              <div className="border border-2 border-black" key={index}>
                <img className="product-sub-img" src={img.secure_url} />
              </div>
            ))}
          </div>
          <div className="row mt-5">
          <div className="col-md-6" key={data.product.id}>  
          <h3 className="mt-3">{data.product.name}</h3>
             {avgRating(data.avgRating)}
          <p className="w-100 m-auto fs-6">{data.product.description}</p>
          <p className="pt-3">Producut code :{data.product.id}</p>
          <p >Avialable quantity :{data.product.stock}</p>
          <h3>Price: ${data.product.price}<span className="px-2 text-danger">Discount: %{data.product.discount}</span></h3>
          <h3>Price after discount: ${data.product.finalPrice}</h3>

          {userToken ? (<button className="btn " onClick={() => addtoCart(data.product.id)}>
              Add to cart
            </button>
          ) : (
           <Link to='/register'> <button className="btn ">Add to cart</button></Link>
          )}
      {<CreateReview /> }
        </div>
        
        <div className="col-md-6">
          <h2 className="text-start head" >Reviews</h2>
          {data.product.reviews.map((review)=>(
            <div className="review border-bottom mb-4 d-flex gap-3 align-items-center"  key={review._id}>
              <div className="me-0 pb-1 w-25 ">
                <h6>{review.createdBy.userName}</h6>
                <img className="ms-2" src={review.createdBy.image.secure_url} />

              </div>
              <div>
                {ratings(review.rating)}
                <div className=" d-flex gap-5 align-align-items-end">
                <p className="fs-5 mb-0">{review.comment}</p>
                <p className="text-secondary date fw-lighter" >{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>

</div>
              </div>
            

          ))}
        </div>
        </div>

    </div>
  );
}
