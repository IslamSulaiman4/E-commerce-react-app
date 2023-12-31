import React from 'react'
import Navbar from '../components/web/Navbar/Navbar.jsx'
import Footer from '../components/web/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer/>
    </div>
  )
}
