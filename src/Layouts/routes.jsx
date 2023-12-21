import { createBrowserRouter } from "react-router-dom";
import Home from "../components/web/Home/Home.jsx";
import Layout from "./Layout.jsx";
import Categories from "../components/web/Categories/Categories.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import HomeDashboard from "../components/dashboard/Home/HomeDashboard.jsx";
import CategoriesForAdmin from './../components/dashboard/Categories/CategoriesForAdmin.jsx';
import Register from "../components/web/Auth/Register.jsx";
import Login from "../components/web/Auth/Login.jsx";
import Cart from './../components/web/Cart/Cart.jsx';
import CategoriesDetails from './../components/web/Categories/CategoriesDetails';
import Profile from './../components/web/Profile/Profile.jsx';
import Product from './../components/web/Products/Product.jsx';
import ProtectedRoute from "../components/web/ProtectedRoute/ProtectedRoute.jsx";
import ForgetPassword from "../components/web/Auth/ForgetPassword.jsx";
import SendCode from "../components/web/Auth/SendCode.jsx";
import UserInfo from "../components/web/Profile/UserInfo.jsx";
import Contact from "../components/web/Profile/Contact.jsx";
import CreateOrder from "../components/web/Orders/CreateOrder.jsx";
import GetOrders from "../components/web/Profile/GetOrders.jsx";
import Products from "./../components/web/Products/Products.jsx";


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
            path:'products',
            element:<Products />
          },
          {
            path:'products/category/:categoryID',
            element:<CategoriesDetails />
          },{
            path:'product/:productID',
            element:<Product />
          },
          {
            path:'profile',
            element:<ProtectedRoute>
              <Profile />
            </ProtectedRoute>,
            children:[
              {
                index:true,
                //path:'info',
                element:<UserInfo />
              },
              {
                path:'contact',
                element:<Contact />
              },
              {
                path:'order',
                element:<GetOrders />
              }
            ]
          },
          {
            path:'order',
            element:<CreateOrder />
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
