import React from 'react'
import Navbar from '../components/dashboard/Navbar/Navbar.jsx'
import Footer from '../components/dashboard/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function() {
  return (
    <div>
        <Navbar/>
        <Outlet />
        <Footer />
        
    </div>
  )
}
