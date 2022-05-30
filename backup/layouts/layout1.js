import React from 'react'
import Navbar1 from '../components/navbar1'
import Footer from '../components/footer'

export default function Layout1(props) {
  const {children} = props
  return (
    <div className='container-fluid p-0 d-flex flex-column align-items-center'>
      <Navbar1 />
        {children}
        <Footer />
        </div>
  )
}
