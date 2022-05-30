import React from 'react'
import Navbar1 from '../components/navbar1'
import Navbar2 from '../components/navbar2'
import Footer from '../components/footer'

export default function Layout1(props) {
  const { token, level } = props.children.props
  let photo
  if (token) {
    photo = props.children.props.profileDetail.data[0].photo
  }
  const {children} = props
  return (
    <div className='container-fluid p-0 d-flex flex-column align-items-center'>
      {token ? (<Navbar1 level={level} photo={photo} />) : (<Navbar2 />)}
        {children}
        <Footer />
        </div>
  )
}
