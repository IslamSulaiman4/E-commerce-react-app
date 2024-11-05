import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../Context/FeatureCart.jsx";
import Loader from "../../Shared/Loader.jsx";
import { UserContext } from "../Context/User.jsx";
import  {avgRating} from '../Review/Ratings.jsx'
import "./Product.css";

export default function Products() {
  const { addToCartContext } = useContext(CartContext);
  const { userToken,order} = useContext(UserContext);
  const { productID } = useParams();



  const getProduct = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productID}`
    );
    console.log('new products',data);
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
    <div className="container  productD mt-4">
      <h2 className="fw-bold py-3">Product Details</h2>
      
       
          <div className="mt-3 d-flex justify-content-between align-items-center ">
<div className="w-50 ">
<img className="product-img border border-2 border-black p-4" src={data.image} />

</div>
          
          <div className="w-50">
          <div className="" key={data.id}>  
          <h3 className="">{data.title}</h3>
             {avgRating(data.rating.rate)}
          <p className="w-100 m-auto fs-6">{data.description}</p>
          <p className="pt-3">Producut code :{data.id}</p>
          <h3 className="mb-3">Price: ${data.price}</h3>

          {userToken ? (<button className="btn " onClick={() => addtoCart(data.product.id)}>
              Add to cart
            </button>
          ) : (
           <Link to='/login'> <button className="btn ">Add to cart</button></Link>
          )}

        </div>
        </div>

        </div>

    </div>
  );
}
