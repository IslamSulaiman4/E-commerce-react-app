import { createBrowserRouter } from "react-router-dom";
import Home from "../components/web/Home/Home.jsx";
import Layout from "./Layout.jsx";
import Categories from "../components/web/Categories/Categories.jsx";
import DashboardLayout from "./DashboardLayout";
import HomeDashboard from "../components/dashboard/Home/HomeDashboard.jsx";
import CategoriesForAdmin from './../components/dashboard/Categories/CategoriesForAdmin';
import Register from "../components/web/Register/Register.jsx";
import Login from "../components/web/Login/Login.jsx";
import Cart from './../components/web/Cart/Cart';
import CategoriesDetails from './../components/web/Categories/CategoriesDetails';
import Profile from './../components/web/Profile/Profile';
import Products from './../components/web/Products/Product';
import ProtectedRoute from "../components/web/ProtectedRoute/ProtectedRoute.jsx";
import ForgetPassword from "../components/web/Auth/ForgetPassword.jsx";
import SendCode from "../components/web/Auth/SendCode.jsx";


export const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
          {
            path:'register',
            element:<Register />
          },
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
            path:'forgetPassword',
            element: <ForgetPassword/>

          },
          {
            path:'sendCode',
            element: <SendCode/>

          },
          {
            path:'products/category/:categoryID',
            element:<CategoriesDetails />
          },{
            path:'product/:productID',
            element:<Products />
          },
          {
            path:'profile',
            element:<Profile />
          }

      ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout />,
        children:[{
        path:'home',
        element:<HomeDashboard />
      }
      ,{
        path:'categories',
        element:<CategoriesForAdmin />
      },
      {
        path:'*',
        element:<h2>page not found --- dashboard</h2>
      }
    ]
  
  
    },
    {
      path:'*',
      element:<h2>page not found</h2>
    }
  ]);
