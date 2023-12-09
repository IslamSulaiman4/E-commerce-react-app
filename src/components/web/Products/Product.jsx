import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../Context/FeatureCart.jsx';

export default function Products() {
  const {addToCartContext}=useContext(CartContext);

    const {productID}=useParams();
   
    const getProduct= async ()=>{
      
      const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productID}`);
      return data.product;
  
    }
  const{data,isLoading}= useQuery('product_details',getProduct);

  const addtoCart =async (productID)=>{
    const res= await addToCartContext(productID);
    //return res;
  }

   if(isLoading){
    return <div> Loading ...</div>
   }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          {data.subImages.map((img,index)=>
          <React.Fragment key={index}>
            <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: img.secure_url
    },
    largeImage: {
        src: img.secure_url,
        width: 1200,
        height: 1800,

    },
    isHintEnabled:true,
    enlargedImagePosition:'over'
}} />
          </React.Fragment>
          )}
          <div className="col-lg-8">
            <h2>{data.price}</h2>
            <p>{data.name}</p>
            <button className='btn btn-outline-info' onClick={()=>addtoCart(data._id)} >Add to cart</button>
          </div>

        </div>
      </div>
    </div>
  )
}
