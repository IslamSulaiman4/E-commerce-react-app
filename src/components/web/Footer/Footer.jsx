import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
<footer className="footer mt-5 ">
  <div className="container mt-2 py-5">
    <div className="row justify-content-center align-items-center row-gap-2" >
      <div className="col-md-4  p-0 d-flex align-items-center justify-content-center  border-end">
        <p className="mb-0">© 2023 TShop. All Rights Reserved.</p>
      </div>
      <div className="col-md-4 p-0 justify-content-center logo border-end">
        <h2>T Shop</h2>
      </div>
      <div className="col-md-4 text-center p-0 ">
        <p className="mb-0">Made By <span className="text-main-color">Islam Sulaiman</span></p>
      </div>
    </div>
  </div>
</footer>

    )

}
