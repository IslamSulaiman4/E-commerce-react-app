import { createBrowserRouter } from "react-router-dom";
import Home from "../components/web/Home/Home.jsx";
import Layout from "./Layout.jsx";
import Categories from "../components/web/Categories/Categories.jsx";
import Login from "../components/web/Auth/Login.jsx";
import Cart from './../components/web/Cart/Cart.jsx';
import CategoriesDetails from './../components/web/Categories/CategoriesDetails';
import Product from './../components/web/Products/Product.jsx';
import ProtectedRoute from "../components/web/ProtectedRoute/ProtectedRoute.jsx";
import Products from "./../components/web/Products/Products.jsx";


export const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[

          {
            path:'login',
            element:<Login/>
          },
          {
            //path:'/',
            index:true,
            element:<Home />
          },
          {
            path:'categories',
            element:<Categories />
          },
          {
            path:'cart',
            element:<ProtectedRoute>
                <Cart/>
            </ProtectedRoute>
          },
          {
            path:'products',
            element:<Products />
          },
          {
            path:'products/category/:category',
            element:<CategoriesDetails />
          },{
            path:'product/:productID',
            element:<Product />
          },

      ]
    },
 {
      path:'*',
      element:<h2>page not found</h2>
    }
  ]);
