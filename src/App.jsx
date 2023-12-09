
import { RouterProvider} from "react-router-dom";
import { CartContextProvider } from './components/web/Context/FeatureCart.jsx';
import { router } from './Layouts/routes';
import { useContext, useEffect } from "react";
import { UserContext } from './components/web/Context/User';



export default function App() {
  
let {setUserToken} =useContext(UserContext);
useEffect(()=>{
  if(localStorage.getItem('userToken')!=null){
    setUserToken(localStorage.getItem('userToken'));
  }
},[]);

  return (

<CartContextProvider> 
    <RouterProvider router={router} />
    </CartContextProvider>




  )
}
