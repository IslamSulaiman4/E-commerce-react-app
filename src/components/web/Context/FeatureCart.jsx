import axios from "axios";
import { createContext, useState} from "react";

export const CartContext= createContext(null);

export function CartContextProvider({children}){
    let [count,setCount]=useState(0);
    const [loading, setLoading] = useState(true);

    const addToCartContext= async(productID)=>{
        try{
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{productId:productID},
            {headers:{Authorization:`Tariq__${token}`}}
            )
           setLoading(false) 
            setCount(data.count);
             setCount(++count)
            return data;
            }
        
        catch(error){
            console.log(error);
        }

    }


    

    const getCartContext= async ()=>{
        try{
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const{ data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}});
            setCount(data.count);
            setLoading(false);
            return data;
            
            
        }
        catch(error){
            console.log(error);
        }
    }


    const removeItemContext= async (productID)=>{
        try{
            setLoading(true)
            const token=localStorage.getItem("userToken");
            const {data} =await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
            {productId:productID},
            {headers:{Authorization:`Tariq__${token}`}})
            setLoading(false)
            getCartContext();
           
            return data
            
        }
        catch(error){
            console.log(error);
        }
    }


    const clearCartContext =async ()=>{
try{
    setLoading(true);
    const token= localStorage.getItem("userToken");
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
   {},
    {headers:{Authorization:`Tariq__${token}`}})
    setLoading(false);

        getCartContext();
        return data
 
}
catch(error){
    console.log(error);
}
}



    return <CartContext.Provider value={{addToCartContext,getCartContext, removeItemContext,count,setCount,clearCartContext,loading,setLoading}}>
        {children}
        </CartContext.Provider>;
}