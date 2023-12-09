import axios from "axios";
import { createContext, useState} from "react";
import {toast } from 'react-toastify';

export const CartContext= createContext(null);

export function CartContextProvider({children}){
    const [cartData,setCartData]=useState(0);

    const addToCartContext= async(productID)=>{
        try{
            const token = localStorage.getItem("userToken");
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{productId:productID},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            
            setCartData(data.count);
            if(data.message=='success'){
                toast.success('added to cart Successfully!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                }
            return data;
            }
        
        catch(error){
            console.log(error);
        }

    }

   

    const getCartContext= async ()=>{
        try{
            const token = localStorage.getItem("userToken");
            const{ data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}});
            return data;
            
        }
        catch(error){
            console.log(error);
        }
    }

    const removeItemContext= async (productID)=>{
        try{
            const token=localStorage.getItem("userToken");
            const {data} =await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
            {productId:productID},
            {headers:{Authorization:`Tariq__${token}`}})
            return data;

        }
        catch(error){
            console.log(error);
        }
    }

    return <CartContext.Provider value={{addToCartContext,getCartContext, removeItemContext,cartData}}>
        {children}
        </CartContext.Provider>;
}