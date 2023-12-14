
import { RouterProvider} from "react-router-dom";
import { CartContext } from './components/web/Context/FeatureCart.jsx';
import { router } from './Layouts/routes';
import { useContext, useEffect } from "react";
import { UserContext } from './components/web/Context/User';



export default function App() {
  
let {setUserToken} =useContext(UserContext);
const {setCount,getCartContext} =useContext(CartContext);

useEffect(()=>{
  if(localStorage.getItem('userToken')!=null){
    setUserToken(localStorage.getItem('userToken'));
    setCount(getCartContext().count);
  }

},[]);

  return (

    <RouterProvider router={router} />

  )
}
