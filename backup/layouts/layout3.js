import React from 'react'
import Sidebar from '../components/sidebar'

export default function Layout3(props) {
  const {children} = props
  return (
    <div className='container-fluid d-flex p-0'>
      <Sidebar />
        {children}
        </div>
  )
}
