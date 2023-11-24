import { createBrowserRouter } from "react-router-dom";
import Home from "../components/web/Home/Home.jsx";
import Layout from "./Layout.jsx";
import Categories from "../components/web/Categories/Categories.jsx";
import DashboardLayout from "./DashboardLayout";
import HomeDashboard from "../components/dashboard/Home/HomeDashboard.jsx";
import CategoriesForAdmin from './../components/dashboard/Categories/CategoriesForAdmin';
import Register from "../components/web/Register/Register.jsx";

export const router= createBrowserRouter([
    {

        path:'/',
        element:<Layout />,
    children:[
        {
            path:'register',
            element:<Register />
        },
        {
            path:'home',
            element:<Home />,
        },
        {
            path:'category',
            element:<Categories />
        }  ]  
    },
    {
        path:'/dashboard',
        element:<DashboardLayout />,
        children:[{
                path:'home',
                element:<HomeDashboard />

            },
            {
                path:'category',
                element:<CategoriesForAdmin />

            }
        ]
    }

])
