import React from 'react'
import Navbar2 from '../components/navbar2'
import Footer from '../components/footer'

export default function Layout2(props) {
  const { children } = props
  return (
    <div className='container-fluid p-0 d-flex flex-column align-items-center'>
      <Navbar2 />
        {children}
        <Footer />
        </div>
  )
}
