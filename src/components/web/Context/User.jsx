import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext= createContext();

export default function UserContextProvider({children}){

    const[userToken,setUserToken]=useState(null);
    const[userData,setUserData]=useState(null);
    const [loading,setLoading]=useState(true);
    const[order,setOrder]=useState(null);

    const getUserData= async()=>{
        if(userToken){
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            {headers:{Authorization:`Tariq__${userToken}`}});       
            setUserData(data.user);
            setLoading(false);
        }
    }
    const getOrderContext= async()=>{
        const token=localStorage.getItem('userToken');
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        {headers:{Authorization:`Tariq__${token}`}});
        setLoading(false);
        setOrder(data)
      return data;
       
    }
    useEffect(() => {
        getOrderContext();
      }, [order]);

    useEffect(()=>{
        getUserData();
    },[userToken])
    
    return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,loading,setLoading,getOrderContext,order,setOrder}}>
        {children}

    </UserContext.Provider>
}